"use client"
import { useUserStore } from "@/store/userStore";
import { createOrder, favoriteProduct, getUserCart, getUserFavorite, orderStripe, removeProductFromCart, updateQuantity, updateUser } from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { toast } from "sonner";


export const useUserFavorite = () => {
    const { user } = useUserStore()
    const locale = useLocale()

    const { data, isPending, error } = useQuery<FavoriteResponse>({
        queryKey: ["favoriteCart", user?._id, locale],
        queryFn: () => user?._id ? getUserFavorite({ userId: user._id, lang: locale }) : Promise.reject(new Error("User ID is undefined")),
        enabled: !!user, // ✅ Prevents query if no user
    })

    return {
        data,
        isPending,
        error
    }
}

export const useUserCart = () => {
    const { user } = useUserStore();
    const locale = useLocale();

    const { data, isPending, error } = useQuery({
        queryKey: ["cart", user?._id, locale],
        queryFn: () => user?._id ? getUserCart({ userId: user._id, lang: locale }) : Promise.reject(new Error("User ID is undefined")),
        enabled: !!user, // Prevents query if no user
    });

    return { data, isPending, error };
};

export const useCreateOrder = () => {

    const locale = useLocale()
    const t = useTranslations()
    const { mutate, isPending } = useMutation({
        mutationKey: ["order"],
        mutationFn: async ({ street, city, phone }: { street: string, city: string, phone: string }) => {
            const result = await createOrder({ street, city, phone })
            return result
        },
        onSuccess: () => {
            toast.success(t('delivery-might-take-2-5-days'));

            setTimeout(() => {
                window.location.href = `/${locale}/`
            }, 3000);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        mutate,
        isPending
    }
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient();
    const t = useTranslations()
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["cart"],
        mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
            const result = await updateQuantity({ productId, quantity });
            return result;
        },
        onSuccess: () => {
            toast.success(t('product-quantity-updated'))
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        mutate,
        isPending,
        error
    }
}

export const useOrderStripe = () => {

    const locale = useLocale()

    const {mutate,isPending,error} = useMutation({
        mutationKey: ["order"],
        mutationFn: async () => {
            const result = await orderStripe({lang:locale})
            return result
        },
        onSuccess: (data) => {
            window.location.href = data.url
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        mutate,
        isPending,
        error
    }
}


export const userUpdateUser = () => {
    const queryClient = useQueryClient();
    const { user,setUser } = useUserStore();
    const t = useTranslations()
    const { mutate } = useMutation({
        mutationKey: ["user"],
        mutationFn: async ({ userId, name, phone }: { userId: string; name: string; phone: string }) => {
            const payload = await updateUser({ userId, name, phone }); // Ensure updateUserAction is correctly imported
            return payload;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            setUser(data)
            toast.success(t('user-updated-successfully'));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate };
};

export const useRemoveProduct = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationKey: ["cart"],
        mutationFn: async ({ productId }: { productId: string }) => {
            const result = await removeProductFromCart({ productId })
            return result
        },
        onSuccess: () => {
            toast.success("Product Removed")
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return {
        mutate,
        isPending,
        error
    }
}



export default function useFavoriteButton() {

    const queryClient = useQueryClient(); // Access React Query's cache

    const { isPending, mutate } = useMutation({
        mutationKey: ['favoriteCart'],
        mutationFn: async (productId: string) => {
            const result = await favoriteProduct({ productId })
            return result
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["favoriteCart"] })
        },
    })

    return {
        isPending,
        mutate
    }
}