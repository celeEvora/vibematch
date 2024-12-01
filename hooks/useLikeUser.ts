import { useState } from "react";
import { likeUser } from "@/services/matches";
import { LikeUser } from "@/types/Match";
import { useUser } from "./useUser";
import { useLikesForUser } from "./useLikesForUser";

export type LikeUserResponse = {
    isLoading: boolean;
    isError: any;
    message: string;
    processLikeUser: (formData: LikeUser) => Promise<void>;
};

export function useLikeUser(): LikeUserResponse {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const { user } = useUser();
    const { mutate } = useLikesForUser(user.id);

    const processLikeUser = async (formData: LikeUser): Promise<void> => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            await likeUser(formData);

            mutate();
            setMessage("User liked successfully.");
        } catch (error) {
            setIsError(error);
            setMessage("An error occurred while liking the user.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        processLikeUser,
    };
}
