import { createClient } from "@supabase/supabase-js";

// const api_key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// const bearer = process.env.NEXT_PUBLIC_SUPABASE_BEARER;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);
// supabaseにデータを挿入する
export default async function insertHandler(req, res) {
  if (req.method === "POST") {
    //   const url = "https://zogqrpdjhulkzbvpuwud.supabase.co/rest/v1/smile_cards";
    //   const headers = {
    //     apikey: api_key,
    //     Authorization: `Bearer ${bearer}`,
    //     "Content-Type": "application/json",
    //   };
    //   const body = JSON.stringify([
    //     { smile_score: req.body.smile_score },
    //     { card_name: req.body.card_name },
    //     { special_attack_name: req.body.special_attack_name },
    //     { description: req.body.description },
    //     { attack_power: req.body.attack_power },
    //     { background_url: req.body.background_url },
    //     { face_image_path: req.body.face_image_path}
    //   ]);
    //   const response = await fetch(url, { method: "POST", headers, body });
    //   const data = await response.json();

    //   console.log(data);

    const { data, error } = await supabase.from("smile_cards").insert([
      {
        smile_score: req.body.smile_score,
        card_name: req.body.card_name,
        special_attack_name: req.body.special_attack_name,
        description: req.body.description,
        attack_power: req.body.attack_power,
        background_url: req.body.background_url,
        face_image_path: req.body.face_image_path,
      },
    ]);
    if (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      console.log(data);
      res.status(200).json({ data });
    }
  } else {
    console.log(error);
    res.status(405).json({ error: "Method not allowed" });
  }
}
