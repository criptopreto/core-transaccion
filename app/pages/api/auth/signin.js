// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signin } from "../../../services/server.auth.services";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send(null);
      }
      const response = await signin({ username, password });
      if (!response) {
        return res.status(400).send(null);
      }
      res.statusCode = 200;
      let user = { isLoggedIn: true, token: response.token };
      req.session.user = user;
      await req.session.save();
      return res.json(user);
    } catch (error) {
      console.error("Error Signin", error);
      return res.status(500).json(null);
    }
  }
  res.statusCode = 405;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ error: "Method not allowed" }));
}, sessionOptions);
