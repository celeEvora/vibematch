import { User } from "@/types/User";

export type PossibleMatch = Omit<User, "email" | "password"> & {
    country: { name: string };
};

export type MatchResponse = {
    data: PossibleMatch[];
};
