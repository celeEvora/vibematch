import useSWR from "swr";
import { getMatchesForUser } from "@/services/matches";
import { PossibleMatch } from "@/types/Match";

export type MatchesForUserHookResponse = {
    matches: PossibleMatch[];
    isLoading: boolean;
    isError: boolean;
    mutate: () => void;
};

type Response = {
    data: PossibleMatch[];
};

const fetcher = async (id: string): Promise<Response> =>
    await getMatchesForUser(parseInt(id));

export function useMatchesForUser(id: number): MatchesForUserHookResponse {
    // const { data, error } = useSWR<Response>(id.toString(), fetcher, {
    const { data, error, mutate } = useSWR<Response>(
        ["/matches", id],
        ([_, id]) => fetcher(id as string),
        {
            suspense: true,
        }
    );

    return {
        matches: data?.data as PossibleMatch[],
        isLoading: !error && !data,
        isError: !!error,
        mutate,
    };
}
