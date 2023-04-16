import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.NEXT_API_ROUTE_URL ?? "http://localhost:5000";
  const { method, cookies } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(
          `${url}user/favorites`, {
            headers: {
              token: cookies.token,
            }
          }
        );
        res.status(200).json(response.data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
