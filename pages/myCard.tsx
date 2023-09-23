import { useEffect } from "react";
import { cardImage } from "../components/card";
import CardFrame from "../components/cardFrame";
import {
  imageURL,
  myCardName,
  myDetail,
  myName,
  myScore,
  myScoreAttackName,
  myScoreSmile,
  faceSrc,
} from "../components/openaiForm";

export default function MyCard() {
  // 3秒間待機
  setTimeout(() => {
    console.log("3秒経過");
  }
  , 3000);

  console.log("myScoreAttackName:", myScoreAttackName);
  console.log("myScoreSmile:", myScoreSmile);

  useEffect(() => {
    async function fetchSmileCardRanking() {
      const response = await fetch("/api/insert_smile_column", {
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
    }
    fetchSmileCardRanking();
  }, []);

  return (
    <CardFrame
      imageURL={imageURL}
      myCardName={myCardName}
      cardImage={cardImage}
      myName={myName}
      myDetail={myDetail}
      myScore={myScore}
    />
  );
}
