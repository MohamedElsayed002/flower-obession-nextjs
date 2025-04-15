"use server"

export async function verifyPasswordAction(code: string,email:string) {
    const response = await fetch(`${process.env.API}/users/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code,email }),
    });
  
    const payload : APIResponse  = await response.json();
    // if ("error" in payload) throw new Error(payload.message);  
    return payload;
  }