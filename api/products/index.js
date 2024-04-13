import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
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

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data) {
      const { error, data: products } = await supabase.from("products").insert({
        name: data.name,
        price: data.price,
        image: data.image,
      });

      if (error) {
        throw error;
      }
      return products;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, ...update }) {
      console.log(id, "p");
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      // console.log(data, "wprk");
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["product", id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id) {
      const { error, data } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      console.log(data, "nvm");
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};
