import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
// supabaseにデータを挿入する
export default async function insertHandler(req, res) {
  if (req.method === 'POST') {
    const { data, error } = await supabase.from('smile_cards').insert([
      { 
        smile_score: req.body.smile_score,
        card_name: req.body.card_name,
        special_attack_name: req.body.special_attack_name,
        description: req.body.description,
        attack_power: req.body.attack_power,
      },
    ])
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
