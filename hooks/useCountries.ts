import useSWR from "swr";
import { getCountries } from "@/services/countries";
import { Country, CountryResponse } from "@/types/Country";

export type CountryHookResponse = {
    countries: Country[];
    isLoading: boolean;
    isError: boolean;
};

const fetcher = async (): Promise<CountryResponse> => await getCountries();

export function useCountries(): CountryHookResponse {
    const { data, error } = useSWR<CountryResponse>("/countries", fetcher, {
        suspense: true,
    });

    return {
        countries: data?.data || [],
        isLoading: !error && !data,
        isError: !!error,
    };
}
