import useSWR from "swr";
import { getPossibleMatches } from "@/services/matches";
import { PossibleMatch, MatchResponse } from "@/types/Match";

export type PossibleMatchesHookResponse = {
    possibleMatches: PossibleMatch[];
    isLoading: boolean;
    isError: boolean;
    mutate: () => void;
    isValidating: boolean;
};

const fetcher = async (id: string): Promise<MatchResponse> =>
    await getPossibleMatches(parseInt(id));

export function usePossibleMatches(id: number): PossibleMatchesHookResponse {
    const { data, error, mutate, isValidating } = useSWR<MatchResponse>(
        id.toString(),
        fetcher,
        {
            suspense: true,
        }
    );

    return {
        possibleMatches: data ? data.data : [],
        isLoading: !error && !data,
        isError: !!error,
        mutate,
        isValidating,
    };
}
