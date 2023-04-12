import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {setCookie} from "cookies-next";
// import nextSession from "next-session";
// const getSession = nextSession();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { method, body } = req;
  // const session = await getSession(req, res);

  const user = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    email: body.email,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    password: body.password,
  }

  switch (method) {
    case "POST":
      try {
        const response = await axios.post(
          "http://localhost:5000/user/login", user
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setCookie('token', response.data.token, { req, res });

        // TODO: save token in session with next-session or next-auth
        // session.token = "token";
        // await session.commit();
        res.status(200).json(response.data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
