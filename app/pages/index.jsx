import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import useUser from "../lib/useUser";

export default function Index() {
  const { user } = useUser({ required: true, redirect: "/auth/signin" });
  return <>{user && <></>}</>;
}
export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;
  if (!user || user === undefined) {
    res.setHeader("location", "/auth/signin");
    res.statusCode = 302;
    return {
      props: {
        user: null,
      },
    };
  }

  res.setHeader("location", "/home");
  res.statusCode = 302;
  return {
    props: {
      user: user,
    },
  };
},
sessionOptions);
