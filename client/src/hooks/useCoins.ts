import useSWR from 'swr';
import { Coin } from "../types";
import React, { useMemo } from "react";
import { fetcher, server_url } from './helper';

// hook to fetch all supported coins
const useCoins = () => {
    const {data: coins = [], error: coinsError, isLoading: coinsLoading} = useSWR<Coin[]>(`${server_url}/coins`, fetcher)
    if (coinsError) {
        console.error('Error fetching all supported coins: ', coinsError)
    }
    return useMemo(() => ({
        coins,
        coinsLoading
    }), [coins, coinsLoading])
}

export default useCoins;