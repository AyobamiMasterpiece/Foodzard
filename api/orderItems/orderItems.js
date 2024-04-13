import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data) {
      const { error, data: orderItems } = await supabase
        .from("order_item")
        .insert(data)
        .select();

      if (error) {
        throw error;
      }
      return orderItems;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
