import { createClient } from '@supabase/supabase-js';
const fs = require('fs');

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
// supabaseのstorageに画像をアップロードする
export default async function uploadHandler(req, res) {
    if (req.method === 'POST') {
        // 画像ファイルを非同期で読み込む
        const imageData = await new Promise((resolve, reject) => {
            fs.readFile(JSON.parse(req.body).path, (err, imageData) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(imageData);
            });
          });
          console.log(imageData)
        const { data, error } = await supabase.storage.from('image').upload('test1.png',imageData, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/png",
          })
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ data });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}
