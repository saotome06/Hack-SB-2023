import { useEffect } from "react";
import { cardImage } from "../components/card";
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

  useEffect(() => {
    async function fetchSmileCardRanking() {
      // 5秒間待機
      setTimeout(() => {
        const response = fetch("/api/insert_smile_column", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            smile_score: myScoreSmile,
            card_name: myCardName,
            special_attack_name: myName,
            description: myDetail,
            attack_power: myScore,
            background_url: imageURL,
            face_image_path: faceSrc,
          }),
        });
        console.log(response);
        console.log("10秒経過");
      }, 5000);
    }
    fetchSmileCardRanking();
  }, []);

  return (
    <>
      <CardFrame
        imageURL={imageURL}
        myCardName={myCardName}
        cardImage={cardImage}
        myName={myName}
        myDetail={myDetail}
        myScore={myScore}
        myScoreSmile={myScoreSmile}
      />
    </>
  );
}
