import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import Axios from "../../../lib/fetch";
import prepareHeader from "../../../services/server.auth.header";

export default withIronSessionApiRoute(configRoute, sessionOptions);

async function configRoute(req, res) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    try {
      let transactions = await Axios(
        "GET",
        "/journal/history",
        null,
        prepareHeader(req.session.user.token)
      );

      if (transactions) {
        return res.status(200).json(transactions);
      } else {
        return res.status(401).send([]);
      }
    } catch (error) {}
  }
  return res.send([]);
}
