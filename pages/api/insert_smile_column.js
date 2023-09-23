import { createClient } from "@supabase/supabase-js";
import { error } from "console";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);
// supabaseにデータを挿入する
export default async function insertHandler(req, res) {
  if (req.method === "POST") {
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
