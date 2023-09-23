// ../lib/smile_card.jsを呼び出して、ランキングを表示するページ
// このファイルは、pages/index.tsxから呼び出される

import axios from 'axios';
import { useEffect, useState } from 'react';
export default function AttackPowerRanking() {
  const [smileCards, setSmileCards] = useState([]);

  useEffect(() => {
    async function fetchSmileCardRanking() {
      const response = await axios.get('../lib/smile_card');
      console.log(response.data.data);
      setSmileCards(response.data.data);
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
            <th>ユーザーID</th>
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
              <td>{smileCard.user_id}</td>
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