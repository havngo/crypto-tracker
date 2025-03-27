import { Autocomplete, TextField, Select, MenuItem, createFilterOptions, Skeleton } from "@mui/material";
import { Coin, Currency } from "../../types";
import { Dispatch, SetStateAction, useMemo } from "react";

interface CurrentPriceProps {
    coins: Coin[];
    setCoinId: Dispatch<SetStateAction<string>>;
    currency: Currency;
    setCurrency: Dispatch<React.SetStateAction<Currency>>;
    currentPrice: number | undefined;
}

// Displaying coin input and current price data
export function CurrentPrice({
    coins,
    setCoinId,
    currency,
    setCurrency,
    currentPrice
}: CurrentPriceProps) {
    const filterOptions = useMemo(() => createFilterOptions({
    matchFrom: "start",
    trim: true,
    stringify: opt => (opt as Coin).symbol
    }), []);

    return <div style={{display: 'flex', flexDirection: 'row', gap: '5%'}}>
        <Autocomplete
        filterOptions={filterOptions}
        onChange={(_, value) => {
            if (value) {
            setCoinId((value as Coin).id || '')
            } 
        }}
        options={coins}
        sx={{ width: 300 }}
        getOptionLabel={opt => `${(opt as Coin).symbol} - ${(opt as Coin).name}`}
        renderOption={(props, option) => {
            return (
            <li {...props} key={(option as Coin).id}>
                {`${(option as Coin).symbol} - ${(option as Coin).name}`}
            </li>
            );
        }}
        renderInput={(params) => <TextField {...params} label="Enter cryptocurrency..." />}
        />
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            label="Currency"
            onChange={(event) => setCurrency(event.target.value as Currency)}
        >
            <MenuItem value={'usd'}>USD</MenuItem>
            <MenuItem value={'vnd'}>VND</MenuItem>
        </Select>
        <h3>Current Price: {currentPrice && 
            `${currency === 'usd' 
            ? `${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency
                }).format(currentPrice)}` 
            : `${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency
                }).format(currentPrice)}`}`}</h3>
        </div>
}