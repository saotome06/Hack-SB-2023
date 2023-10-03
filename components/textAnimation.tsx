import { Box } from "@mui/material";
import styles from "../styles/animation.module.css";
import { useEffect, useState } from "react";

export default function TextAnimation() {
  const [smileCards, setSmileCards] = useState([]);
  useEffect(() => {
    async function fetchSmileCardRanking() {
      const response = await fetch("/api/smile_card", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

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

  return (
    <Box>
      {smileCards.map((smileCard) => (
        <tr className={styles.bubble} key={smileCard.id}>
          <Box>
            <p>{smileCard.special_attack_name}</p>
          </Box>
        </tr>
      ))}
    </Box>
  );
}
