export type FirebaseUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    providerId: string;
    createdAt?: string;
    lastLoginAt?: string;
    accessToken: string;
    refreshToken?: string;
};

export type FirebaseUserProfile = {
    uid: string;
    email: string;
    name: string;
    avatar?: string;
    phone?: string;
    isEmailVerified: boolean;
    provider: 'google' | 'email' | 'phone';
    createdAt: string;
    lastLoginAt: string;
};

