import { useState } from "react";

export default function useSearchUser() {
    const [search, setSearch] = useState("");

    function filterMatches(search: string, matches: any) {
        return matches.filter((match: any) => {
            const fullName = `${match.firstName} ${match.lastName}`;
            return fullName.toLowerCase().includes(search.toLowerCase());
        });
    }

    return {
        search,
        setSearch,
        filterMatches,
    };
}
