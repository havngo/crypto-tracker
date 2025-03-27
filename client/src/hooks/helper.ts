export const server_url = process.env.REACT_APP_SERVER_URL;
if (!server_url) {
  throw new Error('Missing server url')
}

export const fetcher = (url: string) => fetch(url).then(res => res.json())