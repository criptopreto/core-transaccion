import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import jwt from "jsonwebtoken";
import { getUser } from "../../../services/server.auth.services";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    let user = await getUser(req.session.user.token);
    if (user) {
      return res.json({
        ...user,
        isLoggedIn: true,
      });
    }
  }
  return res.json(null);
}
