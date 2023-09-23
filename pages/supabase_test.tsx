import { Button } from "@mui/base";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function getStaticProps() {
  console.log("Start Contact");

  const [response, setResponse] = useState("");
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
    const url = "https://zogqrpdjhulkzbvpuwud.supabase.co/object/image";
    const headers = {
      apikey: api_key,
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "multipart/form-data",
    };

    const supabase = createClient(
      "https://zogqrpdjhulkzbvpuwud.supabase.co",
      api_key,
    );

    const avatarFile = event.target.files[0];
    const fileName = avatarFile.name;
    console.log(`fileName: ${fileName}`);
    const { data, error } = await supabase.storage
      .from("image")
      .upload(fileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });
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
