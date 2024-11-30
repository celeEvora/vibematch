import { create } from "zustand";
import { User } from "@/types/User";

export type RegisterFormType = {
    password: string;
} & Omit<User, "id">;

const initialValues: Partial<RegisterFormType> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    profilePicture: "",
    orientation: "",
    gender: "",
    birthDate: "",
    countryId: "",
};

type FormData = typeof initialValues;

export type RegisterFormStoreType = {
    data: FormData;
    setData: (data: FormData) => void;
    clearData: () => void;
};

export const useRegisterStore = create<RegisterFormStoreType>((set) => ({
    data: {},
    setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
    clearData: () => set({ data: initialValues }),
}));
