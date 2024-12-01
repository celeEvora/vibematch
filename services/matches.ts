import request from "@/utils/networking/api";
import { MatchResponse } from "@/types/Match";
import { LikeUser } from "@/types/Match";

export async function getPossibleMatches(id: number): Promise<MatchResponse> {
    const { data: json } = await request.get(`/possible-matches/${id}`);
    return json;
}

export async function likeUser(formData: LikeUser): Promise<void> {
    const { data: json } = await request.post("/like", formData);
    return json;
}
