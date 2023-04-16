import axios from "axios";
import {setCookie} from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
// import nextSession from "next-session";
// const getSession = nextSession();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_API_ROUTE_URL ?? "http://localhost:5000";
  const { method } = req;
  const body = req.body as { email: string, password: string };

  const user = {
    email: body.email,
    password: body.password,
  }

  switch (method) {
    case "POST":
      try {
        const response = await axios.post(
          `${url}user/login`, user
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setCookie('token', response.data.token, { req, res });
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
