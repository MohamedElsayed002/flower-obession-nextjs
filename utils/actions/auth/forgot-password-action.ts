"use server";

export async function forgotPasswordAction(email : string) {
    const response = await fetch(`${process.env.API}/users/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const payload : APIResponse = await response.json();
    return payload
}