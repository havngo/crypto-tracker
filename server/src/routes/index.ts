import { Router, Request, Response} from 'express';
import axios from 'axios';
import Coin from '../models/coin';

const router = Router();
const API_KEY = process.env.API_KEY
if (!API_KEY) {
    throw new Error('Missing API key to CoinGecko')
}

// in memory store of all supported coins
let coinList: Coin[] = []
// in memory store of historical price data
let historyTrackerMap: Record<string, Record<string, object>> = {}

router.get('/', (req, res) => {
    res.json('Welcome to crypto tracker api endpoint... This is an empty route, try /coins, /coins/{coinId}, or /chart/{coinId}')
})

// supported coins with metadata (ie. coins ID, name, and symbol)
router.get('/coins', async (req: Request, res: Response) => {
    if (!coinList.length) {
        const url = 'https://api.coingecko.com/api/v3/coins/list';
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
        };
        res.header("Access-Control-Allow-Origin", "*");
        const {data} = await axios.get(url, options)
        coinList = data
        res.json(data)
    } else {
        res.json(coinList)
    }
})

// current price of a specified cryptocurrency
router.get('/coins/:id/:currency?', async (req: Request, res: Response) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=${req.params.currency || 'usd,vnd'}`;
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
    };
    res.header("Access-Control-Allow-Origin", "*");
    const {data} = await axios.get(url, options)
    res.json(data)
})

// coin historical chart data
router.get('/chart/:id/:currency?', async (req: Request, res: Response) => {
    const coinId = req.params.id
    const currency = req.params.currency
    if (historyTrackerMap[coinId] && historyTrackerMap[coinId][currency]) {
        res.json(historyTrackerMap[coinId][currency])
    } else {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency ?? 'usd'}&days=1`;
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
        };
        res.header("Access-Control-Allow-Origin", "*");
        const {data} = await axios.get(url, options)
        if (!historyTrackerMap[coinId]) {
            historyTrackerMap[coinId] = {}
        }
        historyTrackerMap[coinId][currency] = data
        res.json(data)
    }
})

export default router;