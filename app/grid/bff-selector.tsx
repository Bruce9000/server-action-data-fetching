import { AsyncAutoComplete } from "@/components/async-auto-complete";
import { useState } from "react";
import { useSearchBFFsQuery } from "./grid-queries";
import { Item } from "./grid-types";

type Props = {
    value: Item | null;
    onChange: (value: Item | null) => void;
};

const BFFSelector = ({ value, onChange }: Props) => {
    const [searchText, setSearchText] = useState<string | null>();
    const { data, isLoading } = useSearchBFFsQuery(searchText ?? "");

    return (
        <AsyncAutoComplete<Item>
            getOptionKey={(o: Item) => o.name}
            getOptionLabel={(o: Item) => o.name}
            label="BFF"
            loading={isLoading}
            loadingText={searchText ? "Loading..." : "Please enter search text"}
            onChange={(val) => {
                onChange(val ?? null);
            }}
            options={data?.items || []}
            setInputValue={setSearchText}
            value={value}
        />
    );
};

export default BFFSelector;
