"use server"

type RegisterProp = {
    email: string;
    name: string;
    gender: "Male" | "Female";
    phone: string;
    password: string
}

export async function RegisterAction({email,name,gender,phone,password}: RegisterProp) {
    const response = await fetch(`${process.env.API}/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name,email,gender,phone,password})
    })

    const payload : RegisterResponse = await response.json()
    // if("error" in payload) throw new Error(payload.message)
    return payload
}