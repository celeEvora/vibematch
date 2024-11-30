import request from "@/utils/networking/api";

export async function register(formData: FormData) {
    const { data: json } = await request.post("/auth/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return json;
}

export async function login(formData: FormData) {
    const { data: json } = await request.post("/auth/login", formData);
    return json;
}

export async function me() {
    const { data: json } = await request.get("/auth/me");
    return json;
}
