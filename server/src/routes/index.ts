import { Router, Request, Response} from 'express';
import axios from 'axios';
import Coin from '../models/coin';

const router = Router();
const API_KEY = process.env.API_KEY
if (!API_KEY) {
    throw new Error('Missing API key to CoinGecko')
}

let coinList: Coin[] = []
let historyTrackerMap: Record<string, object> = {}

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
router.get('/chart/:id', async (req: Request, res: Response) => {
    const coinId = req.params.id
    if (historyTrackerMap[coinId]) {
        res.json(historyTrackerMap[coinId])
    } else {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`;
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
        };
        res.header("Access-Control-Allow-Origin", "*");
        const {data} = await axios.get(url, options)
        historyTrackerMap[coinId] = data
        res.json(data)
    }
})

export default router;