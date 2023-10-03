import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import styles from "../styles/rarityEffect.module.css";

import React, { useEffect, useState } from "react";
import RankingCard from "../components/rankingCard";
import confetti from "canvas-confetti";
import Header from "../components/header";

//TODO 変数入れ
export default function Gacha() {
  const [smileCards, setSmileCards] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const launchConfetti = (particle_cnt) => {
    confetti({
      particleCount: particle_cnt,
      spread: 70,
      origin: { y: 1.0 },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function effect_card(num) {
      document.body.style.background = "none";
      if (num <= 3) {
        setShowCard(true);
        return;
      }
      setTimeout(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2/dist/confetti.browser.min.js";
        script.async = true;
        document.body.appendChild(script);
        launchConfetti(300 * num * num);
        document.body.style.background =
          "linear-gradient(to right, #ff00ff, #00ffff)";
      }, 3500);
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
                  {!showCard ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        width: "100%",
                        margin: "auto",
                        maxWidth: "350px",
                      }}
                    >
                      <p className={styles.flowing}>
                        {smileCard.special_attack_name}
                      </p>
                      {smileCard.rarity == 5 ? (
                        <img src="./r5smile.png" className={styles.flowing} />
                      ) : (
                        <img src="./smile.png" className={styles.flowing} />
                      )}
                    </Box>
                  ) : (
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
                  )}
                </Box>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
