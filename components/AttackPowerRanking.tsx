// ../lib/smile_card.jsを呼び出して、ランキングを表示するページ
// このファイルは、pages/index.tsxから呼び出される

// import axios from "axios";
// import { set } from "date-fns";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import RankingCard from "./rankingCard";
export default function AttackPowerRanking() {
  const [smileCards, setSmileCards] = useState([]);
  useEffect(() => {
    async function fetchSmileCardRanking() {
      // get時の処理
      const response = await fetch("/api/smile_card", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // smileCardsにresponseのデータを格納する
      // 攻撃力の高い順に並び替える
      data.data.sort((a, b) => {
        if (a.smile_score < b.smile_score) {
          return 1;
        } else {
          return -1;
        }
      });
      setSmileCards(data.data);
    }
    fetchSmileCardRanking();
  }, []);

  // ランキングを表示する
  return (
    <div>
      <h1>笑顔度ランキング</h1>
      <table>
        <tbody>
          {smileCards.map((smileCard, index) => (
            <tr key={smileCard.id}>
              <td>{index + 1}</td>
              <>{smileCard.image_url}</>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <RankingCard
                  imageURL={smileCard.background_url}
                  myCardName={smileCard.card_name}
                  cardImage={smileCard.face_image_path}
                  myName={smileCard.special_attack_name}
                  myDetail={smileCard.description}
                  myScore={smileCard.attack_power}
                  myScoreSmile={smileCard.smile_score}
                  faceImage={smileCard.face_image_path}
                  rarity={smileCard.rarity}
                />
              </Box>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
