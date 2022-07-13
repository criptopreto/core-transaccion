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
      let user = await Axios(
        "GET",
        "/user/",
        null,
        prepareHeader(req.session.user.token)
      );

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).send(null);
      }
    } catch (error) {}
  }
  return res.send(null);
}
