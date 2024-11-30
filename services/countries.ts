import request from "@/utils/networking/api";
import { CountryResponse } from "@/types/Country";
import HttpException from "@/utils/networking/exceptions/HttpException";

export async function getCountries(): Promise<CountryResponse> {
    const { data: json } = await request.get<CountryResponse>("/countries");

    return json;

    // try {
    //     const { data: countries } = await request.get<Country[]>("/countries");

    //     return countries;
    // } catch (error) {
    //     const { response } = error as any;
    //     throw new HttpException({
    //         message: response.data.message,
    //         code: response.data.code,
    //     });
    // }
}
