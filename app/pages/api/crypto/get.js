import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(getHistory, sessionOptions);

async function getHistory(req, res) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    let symbols = req.query.symbols;
    if (!symbols) return res.status(400).json([]);
    // Get array from symbols
    let arrSymbols = symbols.toUpperCase().split(",");
    try {
      let history = await axios(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD&e=kraken&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146`
      );
      let data = history.data;
      let result = {};
      let dataSymbol = arrSymbols.map((symbol) => {
        let symbolData = data.RAW[symbol];

        result[symbol] = {
          price: symbolData["USD"].PRICE,
          change: symbolData["USD"].CHANGEPCT24HOUR,
        };
        return null;
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(401).send([]);
    }
  }
  return res.send([]);
}
