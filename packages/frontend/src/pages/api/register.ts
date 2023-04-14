import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const user = {
    username: body.username,
    email: body.email,
    password: body.password,
    role: body.role,
  }

  switch (method) {
    case "POST":
      try {
        const response = await axios.post(
          "http://localhost:5000/user/register", user
        );

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
