import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
// supabaseからデータを取得する
export default async function selectHandler(req, res) {


  if (req.method === 'GET') {

    const { data, error } = await supabase.from('smile_cards').select()
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}