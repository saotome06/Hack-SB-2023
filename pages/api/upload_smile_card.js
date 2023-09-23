import { createClient } from "@supabase/supabase-js";
const fs = require("fs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);
// supabaseのstorageに画像をアップロードする
export default async function uploadHandler(req, res) {
  if (req.method === "POST") {
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
    console.log(imageData);
    const { data: inputData, error } = await supabase.storage
      .from("image")
      .upload("test1.png", imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ inputData });

      const publicURL = await supabase.storage
        .from("image")
        .getPublicUrl("test1.png");

      const src = publicURL.data.publicUrl;

      console.log(`FileName: test1.png, publicURL: ${src}`);

      // DBにレコード作成
      await supabase.from("sample").insert([
        {
          fileName: "test1.png",
          src: src,
        },
      ]);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
