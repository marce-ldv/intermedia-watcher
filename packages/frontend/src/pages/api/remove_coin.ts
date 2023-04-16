import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, cookies } = req;
  const data = {
    id: body.id,
  };

  switch (method) {
    case "POST":
      try {
        const response = await axios.delete(
          "http://localhost:5000/coins/remove", {
            headers: {
              token: cookies.token || null,
            },
            data,
          },
        );

        res.status(200).json(response.data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
