import useSWR from "swr";
import { getMessages } from "@/services/chat";
import { sendMessage } from "@/services/chat";
import { useChats } from "./useChats";
import { useUser } from "./useUser";

export type MessagesHookResponse = {
    messages: any[];
    isLoading: boolean;
    isError: boolean;
    addMessage: (message: any) => void;
};

type Response = {
    data: any[];
};

const fetcher = async (id: string): Promise<Response> =>
    await getMessages(parseInt(id));

export function useMessages(id: number, idMatch: number): MessagesHookResponse {
    const { user } = useUser();
    const { mutate: mutateChats } = useChats(user.id);

    const { data, error, mutate } = useSWR<Response>(
        ["/chat", id],
        ([_, id]) => fetcher(id as string),
        {
            suspense: true,
        }
    );

    const messages = data ? data.data : [];

    const formattedMessages = messages.map((message: any) => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.createdAt),
        user: {
            _id: message.sender.id,
            name: `${message.sender.firstName} ${message.sender.lastName}`,
            avatar: message.sender.profilePicture,
        },
    }));

    // Función para agregar un mensaje local y sincronizar con el backend
    const addMessage = async (newMessage: any) => {
        // Agregar el mensaje al estado local

        try {
            // Enviar el mensaje al servidor
            await sendMessage({
                senderId: user.id,
                receiverId: idMatch,
                content: newMessage.text,
            });

            // Revalidar los datos del servidor
            mutate();
            mutateChats();
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return {
        messages: formattedMessages,
        isLoading: !error && !data,
        isError: !!error,
        addMessage,
    };
}
