import express from "express"
import routes from "./routes";
import cors from "cors";

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }));
app.options('*', cors())
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;