"use server";
import { cookies } from "next/headers";

export async function GetUserInfo() {
  const accessToken = cookies().get("access_token")?.value;

  if (!accessToken) {
    return null
  }
  try {
    const response = await fetch(`${process.env.API}/auth/profile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache"
    })


    // to add more validation if the user write access_token in header to send him back and delete the access_token (fraud)
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        removeCookiesFromHeader()
        return null
      }
    }
    const userProfile = await response.json()

    return userProfile
  } catch (error) {
    console.log(error)
  }
}

export async function removeCookiesFromHeader() {
  cookies().delete("access_token")
}



export async function getAllProducts(lang: string = "en", category: string) {
  const response = await fetch(
    `${process.env.API}/products/all?lang=${lang}&category=${category}`,
    {
      method: "GET",
      cache: "no-cache", // Ensures fresh data, prevents caching
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}



export async function getShopProducts(lang: string = "en",search?:string) {
  const params = new URLSearchParams()
  params.set("lang",lang)

  if(search) {
    params.append("search",search)
  }

  console.log(`${process.env.API}/products/all?${params.toString()}`)
  const response = await fetch(
    `${process.env.API}/products/all?category=shop&${params.toString()}`,
    {
      method: "GET",
      cache: "no-cache", // Ensures fresh data, prevents caching
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}


export async function getProductBySlug(slug: string, locale: string): Promise<Products | null> {
  const encodedSlug = encodeURIComponent(slug);

  const response = await fetch(
    `${process.env.API}/products/get-product-by-slug/${encodedSlug}?lang=${locale}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const data: Products | null = await response.json();

  // Ensure `data` is not `null`
  if (!data) {
    console.warn(`Product not found for slug: ${encodedSlug}`);
    return null;
  }

  return data;
}


export async function addToCart({
  userId,
  productId,
  amount,
}: {
  userId: string;
  productId: string;
  amount: number;
}) {

  const accessToken = cookies().get("access_token")?.value;


  try {
    const response = await fetch(`${process.env.API}/cart/add/${productId}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ userId, quantity: amount }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product to cart: ${response.statusText}`);
    }

    const data = await response.json();

    return data
  } catch (error) {
    console.log('addToCart Error', error)
    return error
  }
}


export async function getUserCart({ userId, lang }: { userId: string, lang: string }) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const response = await fetch(`${process.env.API}/cart/${userId}?lang=${lang}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
    })

    const data: CartResponse = await response.json();
    return data
  } catch (error) {
    console.log('getUserCart Error', error)
    return null
  }
}

export async function getUserOrder() {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const response = await fetch(`${process.env.API}/order/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      }
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log('getUserOrder Error', error)
    return null
  }
}

export async function favoriteProduct({ productId }: { productId: string }) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const response = await fetch(`${process.env.API}/favorite/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      return error
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.log('Add Favorite Catch Error', error)
    return null
  }
}


export async function getUserFavorite({ userId, lang }: { userId: string, lang: string }) {
  const accessToken = cookies().get("access_token")?.value;

  const response = await fetch(`${process.env.API}/favorite/${userId}?lang=${lang}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
    }
  })

  const data = response.json()
  return data
}

export async function updateQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const response = await fetch(
      `${process.env.API}/cart/update/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.statusCode === 400) {
      throw new Error(data.message || "Failed to update quantity");
    }

    return data;
  } catch (error: any) {
    // ✅ Throw the error so useMutation can catch it
    throw new Error(error.message || "Something went wrong");
  }
}

export async function removeProductFromCart({ productId }: { productId: string }) {
  const accessToken = cookies().get("access_token")?.value;

  const response = await fetch(
    `${process.env.API}/cart/remove/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }
  )

  const data = await response.json()
  return data
}


export async function createOrder({ street, city, phone }: { street: string, city: string, phone: string }) {
  const accessToken = cookies().get("access_token")?.value;

  const response = await fetch(
    `${process.env.API}/order/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ city, street, phone }),
    }
  )
  const data = await response.json()
  
  if (!response.ok || data.statusCode === 401) {
    throw new Error(data.message || "Failed to update quantity");
  }

  return data
}

export async function updateUser({userId,name,phone}:{userId:string,name:string,phone:string}) {
  const accessToken = cookies().get("access_token")?.value;

  const response = await fetch(
    `${process.env.API}/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, phone }),
    }
  )
  const data = await response.json()
  
  if (!response.ok || data.statusCode === 401) {
    throw new Error(data.message || "Failed to update quantity");
  }

  return data
}