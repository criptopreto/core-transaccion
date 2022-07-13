import { withIronSessionApiRoute } from "iron-session/next";
import prepareHeader from "../../../services/server.auth.header";
import { sessionOptions } from "../../../lib/session";
import Axios from "../../../lib/fetch";

export default withIronSessionApiRoute(async (req, res) => {
  const user = req.session.user;
  if (!user || user.isLoggedIn === false) {
    return res.status(401).end();
  }
  // Handle post
  if (req.method === "POST") {
    try {
      const { payment_data } = req.body;
      if (!payment_data)
        return res
          .status(400)
          .json({ success: false, error: "Solicitud inválida" });

      if (!payment_data.comment) payment_data.comment = "Transferencia";
      let response = await Axios(
        "POST",
        "/journal/pay",
        payment_data,
        prepareHeader(user.token)
      );

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  return res.status(404).end("Not found");
}, sessionOptions);
