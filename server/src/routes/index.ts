import { Router, Request, Response} from 'express';
import axios from 'axios';

const router = Router();
const API_KEY = process.env.API_KEY
if (!API_KEY) {
    throw new Error('Missing API key to CoinGecko')
}

// // supported currencies list
router.get('/currencies', async (req: Request, res: Response) => {
    const url = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-pro-api-key': API_KEY}
    };

    const {data} = await axios.get(url, options)
    res.json(data)
})

// supported coins with metadata (ie. coins ID, name, and symbol)
router.get('/coins', async (req: Request, res: Response) => {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
    };

    const {data} = await axios.get(url, options)
    res.json(data)
})

// current price of a specified cryptocurrency
router.get('/coins/:id/:currency?', async (req: Request, res: Response) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=${req.params.currency || 'usd,vnd'}`;
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
    };

    const {data} = await axios.get(url + req.params.id, options)
    res.json(data)
})

export default router;