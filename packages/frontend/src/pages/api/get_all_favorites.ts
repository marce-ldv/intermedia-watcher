import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(
          "http://localhost:5000/user/favorites", {
            data: {
              email: 'marce3@test.com',
              // email: req.query.email,
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
