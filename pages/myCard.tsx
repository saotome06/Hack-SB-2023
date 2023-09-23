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
