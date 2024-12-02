import useSWR from "swr";
import { getChats } from "@/services/chat";

export type ChatsHookResponse = {
    chats: any[];
    isLoading: boolean;
    isError: boolean;
    mutate: () => void;
};

type Response = {
    data: any[];
};

const fetcher = async (id: string): Promise<Response> =>
    await getChats(parseInt(id));

export function useChats(id: number): ChatsHookResponse {
    const { data, error, mutate } = useSWR<Response>(
        ["/chats", id],
        ([_, id]) => fetcher(id as string),
        {
            suspense: true,
        }
    );

    return {
        chats: data ? data.data : [],
        isLoading: !error && !data,
        isError: !!error,
        mutate,
    };
}
