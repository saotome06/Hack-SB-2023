import { createClient } from '@supabase/supabase-js';


// supabaseからデータを取得する
export default async function selectHandler(req, res) {
  const supabaseUrl = 'https://zogqrpdjhulkzbvpuwud.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3FycGRqaHVsa3pidnB1d3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NDk2NjEsImV4cCI6MjAxMTAyNTY2MX0.WkuRxW54YkUu71BTudV56pV_sV_Qwl3AJa8AkKqx_Yk'
  const supabase = createClient(supabaseUrl,supabaseKey);

  if (req.method === 'GET') {

    const { data, error } = await supabase.from('smile_cards').select()
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('data:'+data)
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}