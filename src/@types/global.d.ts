declare global {

interface IClientResponse {
    message: string;
    data: unknown;
    error: unknown;
    success: boolean;
}
}

export {}