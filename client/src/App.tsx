import React, {useState, useCallback, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { LineChart } from '@mui/x-charts/LineChart';
import {Coin, Currency} from './types';
import { Select, MenuItem } from '@mui/material';

const server_url = process.env.REACT_APP_SERVER_URL;
if (!server_url) {
  throw new Error('Missing server url')
}

function App() {
  const [cryptoSymList, setCryptoSymList] = useState<Coin[]>([])
  const [coinId, setCoinId] = useState('');
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [currency, setCurrency] = useState<Currency>('usd');

  // historical chart
  const [prices, setPrices] = useState<number[]>()
  const [marketCaps, setMarketCaps] = useState<number[]>()
  const [totalVol, setTotalVol] = useState<number[]>()
  const [xLabels, setXLabels] = useState<string[]>()

  const fetchPrice = useCallback(
    async () => {
      if (!coinId) {
        return;
      }
      try {
        const {data} = await axios.get(`${server_url}/coins/${coinId}/${currency}`)
        setCurrentPrice(data[coinId][currency])
      } catch (e) {
        console.log('Error Fetching Price:::', e, coinId)
      }
    },
    [coinId, currency],
  )

  const fetchCoins = useCallback(async () => {
    try {
      const {data} = await axios.get(`${server_url}/coins`)
      setCryptoSymList(data as Coin[])
    } catch (e) {
      console.log('Error Fetching Coins:::', e)
    }
  }, [])

  const fetchChartData = useCallback(async () => {
    if (!coinId) {
      return;
    }
    try {
      const {data} = await axios.get(`${server_url}/chart/${coinId}/${currency}`)
      const prices = data['prices'].map((elt: number[]) => elt[1])
      const marketCaps = data['market_caps'].map((elt: number[]) => elt[1])
      const vols = data['total_volumes'].map((elt: number[]) => elt[1])
      const xAxis = data['prices'].map((elt: number[]) => new Date(elt[0]).toLocaleTimeString())

      setPrices(prices)
      setMarketCaps(marketCaps)
      setTotalVol(vols)
      setXLabels(xAxis)
    } catch (e) {
      console.log('Error Fetching Chart:::', e)
    }
  }, [coinId])

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    trim: true,
    stringify: opt => (opt as Coin).symbol
  })

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])
  

  useEffect(() => {
    fetchPrice();
    fetchChartData();
  }, [fetchPrice, fetchChartData])

  return (
    <div style={{padding: '3%'}}>
      <h2>Current Price Tracker</h2>
      <div style={{display: 'flex', flexDirection: 'row', gap: '5%'}}>
          <Autocomplete
            filterOptions={filterOptions}
            onChange={(_, value) => {
              if (value) {
                setCoinId((value as Coin).id || '')
              } 
            }}
            options={cryptoSymList}
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
      {coinId && prices && marketCaps && totalVol && xLabels && (
        <><LineChart 
          series={[{data: prices, label: 'Prices'}]} 
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          width={1500}
          height={500}
          /><LineChart series={[{data: marketCaps, label: 'Market Caps'}]} 
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          width={1500}
          height={500}
          /><LineChart series={[{data: totalVol, label: 'Total Volumes'}]} 
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          width={1500}
          height={500}
          />
        </>)}
    </div>
  );
}

export default App;
