import bodyParser from "body-parser";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req, res) {
  console.log("受付開始");
  if (req.method === "POST") {
    return res.status(200).json({ message: "OK" });
  }
}

export const middleware = bodyParser.json();
