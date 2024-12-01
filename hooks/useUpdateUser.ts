import { useState } from "react";
import { updateUser } from "@/services/user";
import { User } from "@/types/User";
import { useUser } from "./useUser";

export type UpdateUserResponse = {
    isLoading: boolean;
    isError: any;
    message: string;
    processUpdateUser: (id: number, formData: Partial<User>) => Promise<void>;
};

export function useUpdateUser(): UpdateUserResponse {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const { mutate } = useUser();

    const processUpdateUser = async (
        id: number,
        formData: Partial<User>
    ): Promise<void> => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            const response = await updateUser(id, formData);

            if (!response) {
                return;
            }

            mutate();
            setMessage("User updated successfully.");
        } catch (error) {
            setIsError(error);
            setMessage("An error occurred while updating the user.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        processUpdateUser,
    };
}
