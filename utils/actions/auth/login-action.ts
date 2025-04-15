"use server"

type LoginProp = {
    email : string;
    password: string
}

export async function LoginAction({email,password} : LoginProp) {
    const response = await fetch(`${process.env.API}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({email,password})
    })

    const payload : LoginResponse = await response.json()
    // if ("error" in payload) throw new Error(payload.message);  
    return payload;
  
}