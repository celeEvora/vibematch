export type Login = {
    email: string;
    password: string;
};

export type AuthResponse = {
    data: { user: User; token: string; expiresIn: number };
};
