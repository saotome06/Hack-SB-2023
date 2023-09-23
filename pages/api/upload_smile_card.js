import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
// supabaseのstorageに画像をアップロードする
export default async function uploadHandler(req, res) {
    if (req.method === 'POST') {
        const { data, error } = await supabase.storage.from('image').upload(req.body.path,req.body.file)
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ data });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}
