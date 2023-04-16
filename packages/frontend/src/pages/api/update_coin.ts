import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { type Coin } from "~/domain/Coin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, cookies } = req;
  const body = req.body as Coin;

  switch (method) {
    case "POST":
      try {
        const response = await axios.put(
          "http://localhost:5000/coins/update",
          {
            ...body,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: cookies.token || null,
            },
          }
        );

        res.status(200).json(response.data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method ?? ''} Not Allowed`);
  }
}
