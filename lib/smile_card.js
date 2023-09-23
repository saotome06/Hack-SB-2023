import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://zogqrpdjhulkzbvpuwud.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3FycGRqaHVsa3pidnB1d3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NDk2NjEsImV4cCI6MjAxMTAyNTY2MX0.WkuRxW54YkUu71BTudV56pV_sV_Qwl3AJa8AkKqx_Yk');

export  async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, image_url, smile_score, special_move_name, special_move_strength, description, attack_power } = req.body;
    const { data, error } = await supabase.from('smile_cards').insert({ user_id, image_url, smile_score, special_move_name, special_move_strength, description, attack_power });
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// supabaseからデータを取得する
export default async function selectHandler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('smile_cards').select();
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}