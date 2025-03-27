import useSWR from 'swr';
import { ChartData, Currency, PriceData } from "../types";
import { useMemo } from "react";
import { server_url, fetcher } from './helper';

interface DataHookProps {
    coinId: string | undefined;
    currency: Currency;
}

interface DataHookReturn {
    price: number | undefined,
    charts: ChartData | undefined,
    loading: boolean
}

// hook to fetch price data and charts
const useData = ({coinId, currency}: DataHookProps): DataHookReturn => {
    const {data: priceData, error: priceError, isLoading: priceLoading} = useSWR<PriceData>(!coinId ? null : `${server_url}/coins/${coinId}/${currency}`, fetcher)
    const {data: charts, error: chartsError, isLoading: chartsLoading} = useSWR<ChartData>(!coinId ? null : `${server_url}/chart/${coinId}/${currency}`, fetcher)

    if (priceError) console.error('Error fetching current price', priceError);
    if (chartsError) console.error('Error fetching chart data', chartsError);
    
    return useMemo(() => ({
        charts,
        price: priceData && coinId ? priceData[coinId][currency] : undefined,
        loading: priceLoading && chartsLoading
    }), [charts, priceData, priceLoading, chartsLoading])
}

export default useData;