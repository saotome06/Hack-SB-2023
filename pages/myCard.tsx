// import { useEffect } from "react";
import { faceImageURL } from "./createCard";
import Navbar from "../components/Navbar";
import CardFrame from "../components/cardFrame";
import {
  imageURL,
  myCardName,
  myDetail,
  myName,
  myRarity,
  myScore,
  myScoreAttackName,
  myScoreSmile,
  faceSrc,
} from "../components/openaiForm";

export let countR = 0;
export default function MyCard() {
  console.log("myScoreAttackName:", myScoreAttackName);
  console.log("myScoreSmile:", myScoreSmile);
  countR = myRarity;
  console.log(faceImageURL);
  console.log(faceSrc);

  // useEffect(() => {
  //   async function fetchSmileCardRanking() {
  //     const response = await fetch("/api/insert_smile_column", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         smile_score: myScoreSmile,
  //         card_name: myCardName,
  //         special_attack_name: myName,
  //         description: myDetail,
  //         attack_power: myScore,
  //         background_url: imageURL,
  //         face_image_path: faceSrc,
  //       }),
  //     });
  //     console.log(response);
  //   }
  //   fetchSmileCardRanking();
  // }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <CardFrame
        imageURL={imageURL}
        myCardName={myCardName}
        cardImage={faceImageURL}
        myName={myName}
        myDetail={myDetail}
        myScore={myScore}
        countR={countR}
        myScoreSmile={myScoreSmile}
        faceImage={faceSrc}
        myRarity={countR}
      />
    </>
  );
}
