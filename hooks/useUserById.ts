import useSWR from "swr";
import { getUser } from "@/services/user";
import { PossibleMatch } from "@/types/Match";

export type UserByIdHookResponse = {
    user: PossibleMatch;
    isLoading: boolean;
    isError: boolean;
};

type Response = {
    data: PossibleMatch;
};

const fetcher = async (id: string): Promise<Response> =>
    await getUser(parseInt(id));

export function useUserById(id: number): UserByIdHookResponse {
    const { data, error } = useSWR<Response>(id.toString(), fetcher, {
        suspense: true,
    });

    return {
        user: data?.data as PossibleMatch,
        isLoading: !error && !data,
        isError: !!error,
    };
}
