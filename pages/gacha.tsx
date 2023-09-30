import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

import React, { useEffect, useState } from "react";
import RankingCard from "../components/rankingCard";
import confetti from "canvas-confetti";
import Header from "../components/header";

//TODO 変数入れ
export default function Gacha() {
  const [smileCards, setSmileCards] = useState([]);

  const launchConfetti = (particle_cnt) => {
    confetti({
      particleCount: particle_cnt,
      spread: 70,
      origin: { y: 1.0 },
    });
  };

  useEffect(() => {
    async function effect_card(num) {
      if (num <= 3) return;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2/dist/confetti.browser.min.js";
      script.async = true;
      document.body.appendChild(script);
      launchConfetti(5 * num * num);
    }

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
      console.log(data.data[idx].rarity);
      effect_card(data.data[idx].rarity);
      return data.data[idx].rarity;
    }
    fetchSmileCardRanking();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {/* <div
          style={{
            width: "100%",
            maxWidth: "100%",
            textAlign: "center",
            margin: "auto",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <h1>笑顔度ガチャ</h1>
        </div> */}
        <Header />
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
