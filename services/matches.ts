import request from "@/utils/networking/api";
import { MatchResponse } from "@/types/Match";

export async function getPossibleMatches(id: number): Promise<MatchResponse> {
    const { data: json } = await request.get(`/possible-matches/${id}`);
    return json;
}
