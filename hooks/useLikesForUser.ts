import useSWR from "swr";
import { getLikesForUser } from "@/services/matches";
import { PossibleMatch } from "@/types/Match";

export type LikesForUserHookResponse = {
    likes: PossibleMatch[];
    isLoading: boolean;
    isError: boolean;
    mutate: () => void;
};

type Response = {
    data: PossibleMatch[];
};

const fetcher = async (id: string): Promise<Response> =>
    await getLikesForUser(parseInt(id));

export function useLikesForUser(id: number): LikesForUserHookResponse {
    const { data, error, mutate } = useSWR<Response>(
        // `/likes/${id}`,
        // () => fetcher(id.toString()),
        ["/likes", id],
        ([_, id]) => fetcher(id as string),
        {
            suspense: true,
        }
    );

    return {
        likes: data ? data.data : [],
        isLoading: !error && !data,
        isError: !!error,
        mutate,
    };
}
