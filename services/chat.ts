import request from "@/utils/networking/api";

export async function getChats(id: number) {
    const { data: json } = await request.get(`/chats/${id}`);
    return json;
}

export async function getMessages(id: number) {
    const { data: json } = await request.get(`/chat/${id}`);
    return json;
}

export async function sendMessage(formData: any) {
    const { data: json } = await request.post("/send-message", formData);
    return json;
}
