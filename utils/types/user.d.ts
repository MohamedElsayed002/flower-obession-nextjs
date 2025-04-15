export type User = {
    name: string;
    email: string;
    phone: string;
    gender: "Male" | "Female";
    role: "Admin" | "User";
    codeExpiresAt : Date;
    verificationCode: string;
} & DatabaseFields;

