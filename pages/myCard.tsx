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
} from "../components/openaiForm";

export let countR = 0;
export default function MyCard() {
  console.log("myScoreAttackName:", myScoreAttackName);
  console.log("myScoreSmile:", myScoreSmile);
  countR = myRarity;

  return (
    <>
      <CardFrame
        imageURL={imageURL}
        myCardName={myCardName}
        cardImage={cardImage}
        myName={myName}
        myDetail={myDetail}
        myScore={myScore}
        myRarity={countR}
      />
    </>
  );
}
