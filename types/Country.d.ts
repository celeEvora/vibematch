export type Country = {
    id: number;
    name: string;
    iso2Code: string;
    flag: string;
    createdAt: string;
    updatedAt: string;
};

export type CountryResponse = {
    data: Country[];
};
