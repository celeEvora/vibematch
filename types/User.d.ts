export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profilePicture: string;
    orientation: string;
    gender: string;
    birthDate: string;
    countryId: string;
};

export type UserResponse = {
    data: {
        country: string;
    } & User;
};
