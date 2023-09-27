import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import RankingCard from "../components/rankingCard";

//TODO 変数入れ
export default function Gacha() {
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
      const idx = await Math.floor(Math.random() * data.data.length);
      await setSmileCards([data.data[idx]]);
    }
    fetchSmileCardRanking();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>笑顔度ガチャ</h1>
        <table>
          <tbody>
            {smileCards.map((smileCard) => (
              <tr key={smileCard.id}>
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
    </>
  );
}
