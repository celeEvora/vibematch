import useSWR from "swr";
import { me } from "@/services/auth";
import { User, UserResponse } from "@/types/User";

export type UserHookResponse = {
    user: User & { country: { name: string; iso2code: string } };
    mutate: () => void;
    isLoading: boolean;
    isError: boolean;
};

const fetcher = async (): Promise<UserResponse> => await me();

export function useUser(): UserHookResponse {
    const {
        data: { data } = {} as UserResponse,
        error,
        mutate,
    } = useSWR<UserResponse>("/auth/me", fetcher);

    return {
        user: data,
        mutate,
        isLoading: !error && !data,
        isError: !!error,
    };
}
