declare type DatabaseFields = {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number
};

declare type SuccessfulResponse = {
    message: string;
}

declare type ErrorResponse = {
    message: string;
    error: string;
    statusCode : number;
}

declare type  SuccessfulLoginResponse = {
    access_token: string
}

declare type SuccessfulRegisterResponse = {
    name : string;
    email : string;
    phone: string;
    gender: string;
    role: string;
} & DatabaseFields

declare type APIResponse = SuccessfulResponse | ErrorResponse

declare type LoginResponse = SuccessfulLoginResponse | ErrorResponse

declare type RegisterResponse = SuccessfulRegisterResponse | ErrorResponse