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
    <div
      style={{
        width: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "36px",
          color: "#ff9900",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        笑顔度ランキング
      </h1>
      <table>
        <tbody>
          {smileCards.map((smileCard, index) => (
            <tr key={smileCard.id}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: index === 0 ? "#ff9900" : "#ccc",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                  margin: "auto",
                  padding: "20px",
                }}
              >
                {index + 1}位
              </div>
              <Box
                sx={{
                  // padding: index === 0 ? "30px" : "10px",
                  backgroundColor: index === 0 ? "#ff9900" : "#fff",
                  boxShadow:
                    index === 0 ? "0px 0px 10px rgba(0, 0, 0, 0.2)" : "none",
                  borderRadius: "10px",
                }}
              >
                {index === 0 ? (
                  <h2
                    style={{
                      textAlign: "center",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "bold",
                      fontSize: "40px",
                      color: "white",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    笑顔王
                  </h2>
                ) : null}
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
