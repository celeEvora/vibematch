import request from "@/utils/networking/api";
import { User } from "@/types/User";

export async function updateUser(id: number, formData: Partial<User>) {
    const { data: json } = await request.patch(`/user/${id}`, formData);
    return json;
}

export async function updateProfilePicture(id: number, formData: FormData) {
    const { data: json } = await request.patch(
        `/user/${id}/profile-picture`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return json;
}

export async function getUser(id: number) {
    const { data: json } = await request.get(`/user/${id}`);
    return json;
}
