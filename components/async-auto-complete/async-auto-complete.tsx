import { Autocomplete, AutocompleteProps, InputLabelProps, Popper, PopperProps, TextField } from "@mui/material";
import debounce from "@mui/material/utils/debounce";
import { HTMLAttributes, MutableRefObject, SyntheticEvent, useCallback } from "react";

type Props<T> = {
    getOptionKey: (option: T) => string;
    getOptionLabel: (option: T) => string;
    label: string;
    loading: boolean;
    onChange: (data: T | null) => void;
    options: Array<T>;
    setInputValue: (input: string) => void;
    disabled?: boolean;
    value: T | null;
    errorMessage?: string;
    inputLabelProps?: InputLabelProps;
    textFieldRef?: MutableRefObject<HTMLInputElement | undefined>;
} & Omit<AutocompleteProps<T, false, boolean, false>, "getOptionLabel" | "onChange" | "renderInput">;

const AsyncAutoComplete = <T,>({
    getOptionKey,
    getOptionLabel,
    label,
    loading,
    onChange,
    options,
    setInputValue,
    disabled,
    sx,
    value,
    renderOption,
    errorMessage,
    inputLabelProps,
    textFieldRef,
    ...otherProps
}: Props<T>) => {
    const debouncedSetInputValue = debounce((inputValue: string) => setInputValue(inputValue), 220);

    const renderOpt = renderOption
        ? renderOption
        : (props: HTMLAttributes<HTMLLIElement>, option: T) => {
              return (
                  <li {...props} key={getOptionKey(option)}>
                      {getOptionLabel(option)}
                  </li>
              );
          };

    const PopperCallback = useCallback((props: PopperProps) => {
        return <FitPopper {...props} />;
    }, []);

    return (
        <Autocomplete<T, false, boolean>
            filterSelectedOptions
            filterOptions={(x) => x}
            getOptionLabel={getOptionLabel}
            loading={loading}
            onChange={(_event, data) => onChange(data)}
            onInputChange={(event: SyntheticEvent | null, newInputValue) => {
                // we also get called if user selects an option from dropdown. lets ignore these so we can quickly jump between options
                if (event && event.type === "change") {
                    debouncedSetInputValue(newInputValue);
                } else {
                    debouncedSetInputValue("");
                }
            }}
            disabled={disabled}
            options={value ? [value, ...options] : options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    fullWidth
                    error={!!errorMessage}
                    helperText={errorMessage}
                    inputRef={textFieldRef}
                    InputLabelProps={inputLabelProps}
                />
            )}
            renderOption={renderOpt}
            size="small"
            value={value}
            sx={sx}
            PopperComponent={PopperCallback}
            {...otherProps}
        />
    );
};

const FitPopper = (props: PopperProps) => (
    <Popper
        {...props}
        style={{
            minWidth: `${(props.anchorEl as HTMLElement).clientWidth}px`,
            width: "fit-content",
        }}
        placement="bottom-start"
    />
);

export default AsyncAutoComplete;
