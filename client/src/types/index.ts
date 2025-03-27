// represents a Coin with identifiers
export type Coin = {
    id: string,
    symbol: string,
    name: string,
}

// supported currency in this mini project
export type Currency = 'usd' | 'vnd'

// different chart types the public api returns
export type ChartType = 'prices' | 'market_caps' | 'total_volumes';

// mimic chart api return type
export type ChartData = Record<ChartType, number[][]>

// mimic current price api return type
export type PriceData = Record<string, Record<Currency, number>>