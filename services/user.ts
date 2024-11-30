import request from "@/utils/networking/api";

export async function updateUser(id: number, formData: FormData) {
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
