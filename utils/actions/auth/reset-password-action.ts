"use server"

type ResetPasswordProp = {
  email: string;
  password: string
}
export async function resetPasswordAction({email,password} :ResetPasswordProp ) {
    const response = await fetch(`${process.env.API}/users/forgot-password-complete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword: password }),
    });
  
    const payload : APIResponse= await response.json();
    // if ("error" in payload) throw new Error(payload.message);    
    return payload;
  }