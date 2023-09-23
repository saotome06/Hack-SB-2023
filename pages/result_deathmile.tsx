/**
 * 必殺技を入力したあとに表示される画面
 */

import { useState, useEffect } from "react";

export default function Deathmile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await fetch("/api");
      const data = await reponse.json();
      setName(data.name);
    };
    fetchData();
  }, []);

  return (
    <>
      <main>
        <h2>必殺技、これはつまりデスマイル</h2>
        <p>必殺技名：{name}</p>
      </main>
    </>
  );
}
