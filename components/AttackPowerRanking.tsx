// ../lib/smile_card.jsを呼び出して、ランキングを表示するページ
// このファイルは、pages/index.tsxから呼び出される

// import axios from "axios";
// import { set } from "date-fns";
import { useEffect, useState } from "react";
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
        <thead>
          <tr>
            <th>順位</th>
            <th>画像</th>
            <th>笑顔度</th>
            <th>必殺技の名前</th>
            <th>説明</th>
            <th>攻撃力</th>
          </tr>
        </thead>
        <tbody>
          {smileCards.map((smileCard, index) => (
            <tr key={smileCard.id}>
              <td>{index + 1}</td>
              <td>
                <img src={smileCard.image_url} alt="smile card" />
              </td>
              <td>{smileCard.smile_score}</td>
              <td>{smileCard.special_attack_name}</td>
              <td>{smileCard.description}</td>
              <td>{smileCard.attack_power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
