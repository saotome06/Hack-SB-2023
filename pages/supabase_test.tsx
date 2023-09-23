import { Button } from "@mui/base";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

function SuperbaseTest() {
  console.log("Start Contact");

  const supabaseUrl = "https://zogqrpdjhulkzbvpuwud.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3FycGRqaHVsa3pidnB1d3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NDk2NjEsImV4cCI6MjAxMTAyNTY2MX0.WkuRxW54YkUu71BTudV56pV_sV_Qwl3AJa8AkKqx_Yk";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [response, setResponse] = useState("");

  const handleClick = async () => {
    // ここにAPIをたたく処理を実装
    const url =
      "https://zogqrpdjhulkzbvpuwud.supabase.co/rest/v1/smile_cards?select=*";
    const headers = {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3FycGRqaHVsa3pidnB1d3VkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTQ0OTY2MSwiZXhwIjoyMDExMDI1NjYxfQ.sDiPUVjMuBlymnGMvncVesbwaZq_TB9pYRCRtKD9BQo",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3FycGRqaHVsa3pidnB1d3VkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTQ0OTY2MSwiZXhwIjoyMDExMDI1NjYxfQ.sDiPUVjMuBlymnGMvncVesbwaZq_TB9pYRCRtKD9BQo",
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
