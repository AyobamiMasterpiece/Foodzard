import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import { authContext, useAuth } from "@Providers/authProvider";
export const useMyOrders = () => {
  const { sessions: user, profile } = useAuth();

  return useQuery({
    queryKey: ["orders", { userId: user?.id }],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("order")
        .select("*")
        .eq("user_id", user.user.id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order")
        .select("*,order_item(*,products(*))")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrders = () => {
  const queryClient = useQueryClient();
  const { sessions } = useAuth();

  const id = sessions?.user?.id;

  return useMutation({
    async mutationFn(data) {
      const { error, data: orders } = await supabase
        .from("order")
        .insert({
          ...data,
          user_id: id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }
      return orders;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, update }) {
      const { data: updatedOrder, error } = await supabase
        .from("order")
        .update(update)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      // console.log(data, "wprk");
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["order"]);
      await queryClient.invalidateQueries(["order", id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
