import bodyParser from 'body-parser';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    res.status(200).json({ name: data.name });
  } else {
    res.status(405).end();
  }
}

export const middleware = bodyParser.json();