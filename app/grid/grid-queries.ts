import { searchItems } from "@/app/grid/grid-dao";
import { SearchItemsRequest } from "@/app/grid/grid-types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const useSearchItemsQuery = (searchText: string, page: number) => {
    const [debouncedSearchText] = useDebounce(searchText, 275);

    const req = {
        searchText: debouncedSearchText,
        page,
    } as SearchItemsRequest;

    return useQuery({
        queryKey: ["items", debouncedSearchText, page],
        queryFn: () => searchItems(req),
        placeholderData: keepPreviousData,
    });
};

export const useSearchBFFsQuery = (searchText: string) => {
    const [debouncedSearchText] = useDebounce(searchText, 275);

    const req = {
        searchText: debouncedSearchText,
        page: 0,
    } as SearchItemsRequest;

    return useQuery({
        queryKey: ["bffs", debouncedSearchText],
        queryFn: () => searchItems(req),
        placeholderData: keepPreviousData,
    });
};
