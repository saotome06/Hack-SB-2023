import { Button } from "@mui/base";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function getStaticProps() {
  console.log("Start Contact");

  const [response, setResponse] = useState("");
  const [responseBucket, setResponseBucket] = useState("");
  const api_key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const bearer = process.env.NEXT_PUBLIC_SUPABASE_BEARER;

  const handleGetClick = async () => {
    const url = "https://zogqrpdjhulkzbvpuwud.supabase.co/rest/v1/smile_cards";
    const headers = {
      apikey: api_key,
      Authorization: `Bearer ${bearer}`,
    };
    const response = await fetch(url, { headers });
    const data = await response.json();
    setResponse(JSON.stringify(data));
  };

  const handlePutClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient(
      "https://zogqrpdjhulkzbvpuwud.supabase.co",
      api_key,
    );

    const avatarFile = event.target.files[0];
    const fileName = avatarFile.name;
    console.log(`fileName: ${fileName}`);
    const { data: inputData, error } = await supabase.storage
      .from("image")
      .upload(fileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });
    if (error) {
      console.log(error);
      alert("アップロードに失敗しました");
    } else {
      console.log(inputData);
      alert("アップロードに成功しました");

      const publicURL = await supabase.storage
        .from("image")
        .getPublicUrl(fileName);

      const src = publicURL.data.publicUrl;

      console.log(`FileName: ${fileName}, publicURL: ${src}`);

      // DBにレコード作成
      await supabase.from("sample").insert([
        {
          fileName: fileName,
          src: src,
        },
      ]);
    }
  };

  return (
    <>
      <main>
        <Button onClick={handleGetClick}>取得</Button>
        <br />
        <input type="file" onChange={handlePutClick} />
        {/* <Button onClick={handlePutClick}>追加</Button> */}
        <div>{response}</div>
      </main>
    </>
  );
}

// storage の key から bucket 名を取り除く
export const removeBucketPath = (key: string, bucketName: string) => {
  return key.slice(bucketName.length + 1); // "/"の分だけ加算している
};
