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
import confetti from "canvas-confetti";
import React, { useEffect } from "react";

export let countR = 0;
export default function MyCard() {
  console.log("myScoreAttackName:", myScoreAttackName);
  console.log("myScoreSmile:", myScoreSmile);
  countR = myRarity;
  console.log(faceImageURL);
  console.log(faceSrc);

  useEffect(() => {
    const launchConfetti = (particle_cnt) => {
      confetti({
        particleCount: particle_cnt,
        spread: 70,
        origin: { y: 1.0 },
      });
    };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
    launchConfetti(100);
  });

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
