import { Box } from "@mui/material";
import { countR } from "../pages/myCard";
import Navbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";
// import { useEffect } from "react";

export default function CardFrame(props) {
  function findObjectWithFaceImage(dataArray, faceImage) {
    return dataArray.find((item) => item.face_image_path === faceImage);
  }

  async function insertData() {
    console.log("Start insertData");
    console.log(`props.myScoreSmile: ${props.myScoreSmile}`);
    console.log(`props.myCardName: ${props.myCardName}`);
    console.log(`props.myName: ${props.myName}`);
    console.log(`props.myDetail: ${props.myDetail}`);
    console.log(`props.myScore: ${props.myScore}`);
    console.log(`props.imageURL: ${props.imageURL}`);
    console.log(`props.faceImage: ${props.faceImage}`);

    const url =
      "https://zogqrpdjhulkzbvpuwud.supabase.co/rest/v1/smile_cards?select=face_image_path";
    const headers = {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_BEARER}`,
    };
    const response = await fetch(url, { headers });
    const data_get = await response.json();
    // console.log(JSON.stringify(data_get));

    const matchingObject = findObjectWithFaceImage(data_get, props.faceImage);

    if (!matchingObject) {
      console.log("Start store Database")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY,
      );

      const { data, error } = await supabase.from("smile_cards").insert([
        {
          smile_score: props.myScoreSmile,
          card_name: props.myCardName,
          special_attack_name: props.myName,
          description: props.myDetail,
          attack_power: props.myScore,
          background_url: props.imageURL,
          face_image_path: props.faceImage,
        },
      ]);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
      console.log("End insertData");
    }

    // useEffect(() => {
    //   async function fetchSmileCardRanking() {
    //     const response = fetch("/api/insert_smile_column", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         smile_score: props.myScoreSmile,
    //         card_name: props.myCardName,
    //         special_attack_name: props.myName,
    //         description: props.myDetail,
    //         attack_power: props.myScore,
    //         background_url: props.imageURL,
    //         face_image_path: props.faceImage,
    //       }),
    //     });
    //     console.log(response);
    //   }
    //   fetchSmileCardRanking();
    // }, []);
  }

  if (props.imageURL) {
    insertData();
  }

  return (
    <>
      <Navbar />
      <br></br>
      <Box
        sx={{
          // fontFamily: card_font,
          border: "1px solid black",
          margin: "auto",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
          backgroundImage: `url(${props.imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "375px",
        }}
      >
        <Box
          sx={{
            fontSize: "20px",
            top: 15,
            padding: "4px",
            backgroundColor: "#ddd",
            color: "black",
            width: "95%",
            boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
            opacity: 0.8,
            fontWeight: "bold",
          }}
        >
          <div>
            {Array.from({ length: countR }).map((_, index) => (
              <img
                key={index}
                style={{
                  width: "30px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src="./rar.svg"
              />
            ))}
          </div>
          <a>{props.myCardName.replace('"', "").replace('"', "")}</a>
        </Box>
        <img
          style={{
            width: "310px",
            marginTop: "10px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow:
              "0px 0px 20px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
          src={props.cardImage}
        />
        <Box
          sx={{
            textAlign: "left",
            width: "100%",
            marginTop: "20px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <Box
            sx={{
              padding: "5px",
              margin: "auto",
              fontSize: "20px",
              backgroundColor: "#ddd",
              color: "black",
              boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
              opacity: 0.8,
            }}
          >
            <Box
              sx={{
                fontSize: "13px",
              }}
            >
              <p className="text-3xl font-bold underline">
                【必殺技】{props.myName}
              </p>
              <p className="text-3xl font-bold underline"> {props.myDetail}</p>
            </Box>
            <Box
              sx={{
                borderTop: "3px solid white",
                textAlign: "right",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              <p className="text-3xl font-bold underline">
                ATK/{props.myScore} 笑顔スコア/{props.myScoreSmile}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
