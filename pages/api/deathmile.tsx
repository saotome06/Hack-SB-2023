import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API Start");
  console.log(req.body);
  if (req.method === "POST") {
    const data = req.body;
    return res.status(200).json(data.name);
  }
}

export const middleware = bodyParser.json();
