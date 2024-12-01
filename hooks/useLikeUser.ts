import { useState } from "react";
import { likeUser } from "@/services/matches";
import { LikeUser } from "@/types/Match";

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

    const processLikeUser = async (formData: LikeUser): Promise<void> => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            await likeUser(formData);

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
