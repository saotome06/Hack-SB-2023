// ../lib/smile_card.jsを呼び出して、ランキングを表示するページ
// このファイルは、pages/index.tsxから呼び出される

import axios from 'axios';
import { useEffect, useState } from 'react';
export default function AttackPowerRanking() {
  // const [smileCards, setSmileCards] = useState([]);

  // useEffect(() => {
  //   async function fetchSmileCardRanking() {
  //     // get時の処理
  //     const response = await fetch("/api/smile_card", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     // smileCardsにresponseのデータを格納する
  //     // 攻撃力の高い順に並び替える
  //     data.data.sort((a, b) => {
  //       if (a.attack_power < b.attack_power) {
  //         return 1;
  //       } else {
  //         return -1;
  //       }
  //     });
  //     setSmileCards(data.data);
  //   }
  //   fetchSmileCardRanking();
  // }, []);
  const [smileCards, setSmileCards] = useState([]);

  useEffect(() => {
    async function fetchSmileCardRanking() {
      // get時の処理
      const response = await fetch("/api/upload_smile_card", {
        method: "POST",
        headers: {
          "Content-Type": " multipart/form-data",
        },
        // req.path,req.fileに値を渡す
        body: JSON.stringify({ path: '/public/image/1.jpg', file: '1.jpg' }),
      });

    }
    fetchSmileCardRanking();
  }, []);
  // ランキングを表示する
  return (
    <div>
      <h1>攻撃力ランキング</h1>
      <table>
        <thead>
          <tr>
            <th>順位</th>
            <th>画像</th>
            <th>笑顔度</th>
            <th>必殺技の名前</th>
            <th>必殺技の強さ</th>
            <th>特徴的な文章</th>
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
              <td>{smileCard.special_move_name}</td>
              <td>{smileCard.special_move_strength}</td>
              <td>{smileCard.description}</td>
              <td>{smileCard.attack_power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}