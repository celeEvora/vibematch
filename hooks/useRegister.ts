import { useState } from "react";
// TODO: Import service
import type { RegisterFormType } from "@/stores/useRegisterStore";

export type RegisterResponse = {
    isLoading: boolean;
    isError: any;
    message: string;
    processRegister: (formData: RegisterFormType) => Promise<void | string>;
};

function configureMultiPartData(formData: RegisterFormType): FormData {
    const requestData = new FormData();

    // Adds the non-file data
    requestData.append("firstName", formData.firstName);
    requestData.append("lastName", formData.lastName);
    requestData.append("email", formData.email);
    requestData.append("password", formData.password);
    requestData.append("orientation", formData.orientation);
    requestData.append("gender", formData.gender);
    requestData.append("birthDate", formData.birthDate.toString());
    requestData.append("countryId", formData.countryId);

    // Adds the profile picture if it exists
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
            name: `profile.${fileType}`,
            type: `image/${fileType}`,
        } as any);
    }

    return requestData;
}

export function useRegister(): RegisterResponse {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);
    const [message, setMessage] = useState<string>("");

    const processRegister = async (
        formData: RegisterFormType
    ): Promise<void | string> => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            const requestData = configureMultiPartData(formData);
            // const response = await registerService(requestData);
            // if (!response) {
            //     return;
            // }
            // setMessage("User registered successfully");
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        processRegister,
    };
}
