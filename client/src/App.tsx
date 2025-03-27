import React, {useState, useEffect} from 'react';
import {Currency} from './types';
import HistoricalCharts from './components/HistoricalCharts/HistoricalCharts';
import useCoins from './hooks/useCoins';
import { Loading } from './components/Loading/Loading';
import { CurrentPrice } from './components/CurrentPrice/CurrentPrice';
import useData from './hooks/useData';

function App() {
  // loading state
  const [loading, setLoading] = useState<boolean>();
  // GET all supported coins to fill in dropdown options
  const {coins, coinsLoading} = useCoins();
  // keep track of the coin selected
  const [coinId, setCoinId] = useState('');
  // keep track of the currency selected
  const [currency, setCurrency] = useState<Currency>('usd');
  // GET current price and chart data based on selected coin and currency
  const {price, charts, loading: dataLoading} = useData({coinId, currency});
  
  // historical chart values
  const [prices, setPrices] = useState<number[]>()
  const [marketCaps, setMarketCaps] = useState<number[]>()
  const [totalVol, setTotalVol] = useState<number[]>()
  const [xLabels, setXLabels] = useState<string[]>()

  // update charts visualizations whenever chart data changes
  useEffect(() => {
    if (!charts) {
      return;
    }
    const prices = charts['prices'].map((elt: number[]) => elt[1])
    const marketCaps = charts['market_caps'].map((elt: number[]) => elt[1])
    const vols = charts['total_volumes'].map((elt: number[]) => elt[1])
    const xAxis = charts['prices'].map((elt: number[]) => new Date(elt[0]).toLocaleTimeString())

    setPrices(prices)
    setMarketCaps(marketCaps)
    setTotalVol(vols)
    setXLabels(xAxis)
  }, [charts])

  // show loading indicator whenever fetching any data
  useEffect(() => {
    setLoading(coinsLoading || dataLoading)
  }, [coinsLoading, dataLoading])

  
  return (<>
    {loading && <Loading/>}
    <div style={{padding: '3%', paddingTop: '1%'}}>
      <h2>Cryptocurrency Price Tracker</h2>
      <CurrentPrice coins={coins} setCoinId={setCoinId} currency={currency} setCurrency={setCurrency} currentPrice={price}  />
      {prices && marketCaps && totalVol && xLabels && (
        <HistoricalCharts charts={[
          {
            data: prices,
            label: 'Prices',
            xLabels
          },
          {
            data: marketCaps,
            label: 'Market Caps',
            xLabels
          },
          {
            data: totalVol,
            label: 'Total Volumes',
            xLabels
          }
        ]} />)}
        <p><i>Made by <a href='https://github.com/havngo'>Ha Ngo</a></i></p>
    </div>
    </>
  );
}

export default App;
