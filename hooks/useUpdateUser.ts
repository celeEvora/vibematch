import { useState } from "react";
import { updateProfilePicture } from "@/services/user";
import { User } from "@/types/User";
import { useUser } from "./useUser";

export type UpdateUserResponse = {
    isLoading: boolean;
    isError: any;
    message: string;
    processUpdateProfilePicture: (
        id: number,
        formData: Pick<User, "profilePicture">
    ) => Promise<void>;
};

function configureMultiPartData(
    formData: Pick<User, "profilePicture">
): FormData {
    const requestData = new FormData();

    if (formData.profilePicture) {
        const uriParts = formData.profilePicture.split(".");
        const fileType = uriParts[uriParts.length - 1];

        const isValidFileType = ["jpg", "jpeg", "png"].includes(
            fileType.toLowerCase()
        );
        if (!isValidFileType) {
            throw new Error(
                "Invalid file type. Please upload a jpg, jpeg, or png file."
            );
        }

        requestData.append("profilePicture", {
            uri: formData.profilePicture,
            type: `image/${fileType}`, // Type MIME
            name: `profile.${fileType}`,
        } as unknown as Blob);
    }

    return requestData;
}

export function useUpdateUser(): UpdateUserResponse {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const { mutate } = useUser();

    const processUpdateProfilePicture = async (
        id: number,
        formData: Pick<User, "profilePicture">
    ): Promise<void> => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            const requestData = configureMultiPartData(formData);
            const response = await updateProfilePicture(id, requestData);
            if (!response) {
                return;
            }

            setMessage("Profile picture updated successfully");
            mutate();
        } catch (error) {
            console.log("error:", error);
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        processUpdateProfilePicture,
    };
}
