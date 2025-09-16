"use server"

export async function TestLoginAction() {
    const response = await fetch(`${process.env.API}/auth/test-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const payload: LoginResponse = await response.json();
    return payload;
}
