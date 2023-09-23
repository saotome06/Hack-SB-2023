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
} from "../components/openaiForm";

export default function MyCard() {
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
        }),
      });
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
