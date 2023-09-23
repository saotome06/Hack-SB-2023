import { Button } from "@mui/base";
import { useState } from "react";

function SuperbaseTest() {
  console.log("Start Contact");

  const [response, setResponse] = useState("");
  const api_key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const bearer = process.env.NEXT_PUBLIC_SUPABASE_BEARER;

  const handleClick = async () => {
    const url =
      "https://zogqrpdjhulkzbvpuwud.supabase.co/rest/v1/smile_cards?select=*";

    console.log(api_key);
    console.log(bearer);
    const headers = {
      apikey: api_key,
      Authorization: `Bearer ${bearer}`,
    };
    const response = await fetch(url, { headers });
    const data = await response.json();
    setResponse(JSON.stringify(data));
  };

  return (
    <>
      <main>
        <Button onClick={handleClick}>取得</Button>
        <div>{response}</div>
      </main>
    </>
  );
}

export default SuperbaseTest;
