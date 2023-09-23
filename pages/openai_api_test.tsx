import { useState } from "react";
import { Button } from "@mui/material";
import OpenAI from "openai";

export default function Home() {
  function Attack_Name_Button() {
    const [name, setname] = useState("ちょーすごいパーンチ");
    const [attack_score, set_attack_score] = useState(1000);
    const [output_data, set_randomData] = useState(
      "「ちょーすごいパーンチ」は、使用者が蓄積した集中力とエネルギーを一点に絞り、極限まで強化した拳を一瞬で放つ技。力の源は真剣勝負の熱量で、パンチが命中すれば周囲も巻き込むほどの衝撃波を生む。",
    );
    const [face_pos,set_face_pos] = useState("{MOUTH:[58, 65, 87, 98, 58, 64, 71, 85, 83, 72, 68, 66, 98, 87, 86, 93, 86, 89, 87, 96, 78, 76, 58, 64, 69, 79, 77, 69, 67, 66, 98, 87, 84, 90, 82, 85, 86, 95, 73, 72], LEFT_EYE:[58, 61, 27, 49, 43, 37, 32, 28, 33, 39, 44, 51, 55, 54, 28, 58], RIGHT_EYE:[37, 39, 12, 32, 27, 22, 17, 14, 17, 22, 27, 32, 36, 35, 14, 38] LEFT_MAYU:[71, 55, 64, 25, 70, 42, 46, 60, 33, 33, 28], RIGHT_MAYU:[46, 39, 44, 19, 46, 32, 35, 47, 43, 27]}");
    const [smile_score, set_smile_score] = useState(1000);



    async function sendPrompt_smile_score(prompt = "") {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      console.log("start");

      const content = "FaceMeshを利用して顔のキーポイントを検出しました．鼻の頭からの距離を測定します．顔の表情が変化した時に，普段の顔の状態からどれぐらい変化があるかのユークリッド距離を100倍した配列を与えます．MOUTHは口付近，LEFT_EYEは左目付近，RIGHT_EYEは右目付近，LEFT_MAYUは左眉付近，RIGHT_MAYUは右眉付近です．顔の表情がどれぐらい笑顔なのかを0以上100以下の数値で推定してください．文句言わずに数字だけ返してください．" + "[" + face_pos + "]";
      console.log(content);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      console.log(content);
      const answer = completion.choices[0].message?.content;
      const regex = /[^0-9]/g;
      const result = answer.replace(regex, "");
      const number = parseInt(result);
      console.log("end");
      set_smile_score(number);
      let random_Data =
        Math.random() * 1000 +
        number +
        number *
          0.1 *
          Math.sqrt(-2 * Math.log(1 - Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
        random_Data *= 100;
      if (random_Data < 0) random_Data = 100;
      set_smile_score(Math.round(random_Data));
      console.log(answer,number,random_Data);
    }


    async function sendPrompt(prompt = "") {
      //console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
      //.env.local に NEXT_PUBLIC_OPENAI_API_KEY=xxxxxxxxxxxxxxを入れる

      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      console.log("start");

      const p = Math.random();
      let prompt_base = "";
      if (p <= 0.1) {
        prompt_base =
          "必殺技の名前を言うので，ごく普通の面白みのない技の説明を100文字程度でしてください．";
      } else if (p <= 0.6) {
        prompt_base =
          "必殺技の名前を言うので，ユーモア溢れる厨二病全開の技の説明を100文字程度でしてください．";
      } else if (p <= 0.7) {
        prompt_base =
          "必殺技の名前を言うので，3歳児が考えたレベルの技の説明を100文字程度でしてください．";
      } else {
        prompt_base =
          "必殺技の名前を言うので，理論的で死ぬほど真面目腐ったの技の説明を100文字程度でしてください．";
      }
      console.log(p);
      const content = prompt_base + "技名[" + prompt + "]";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      console.log(completion);
      const answer = completion.choices[0].message?.content;
      console.log(answer);
      console.log("end");
      set_randomData(answer);
    }

    async function sendPrompt_cal_attack_score(prompt = "") {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      console.log("start");

      const content =
        "技名[" +
        prompt +
        "]の表現がどれぐらい強そうな印象を与えられているのかを10以上10000以下の数値で評価してください．";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      console.log(completion);
      const answer = completion.choices[0].message?.content;
      console.log(answer);
      console.log("end");
      const regex = /[^0-9]/g;
      const result = answer.replace(regex, "");
      const number = parseInt(result);
      let random_Data =
        Math.random() * 1000 +
        number +
        number *
          0.1 *
          Math.sqrt(-2 * Math.log(1 - Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
      if (random_Data < 0) random_Data = 100;
      set_attack_score(Math.round(random_Data));
      console.log(number, random_Data);
    }

    const onChangeHandler0 = (e: any) => {
      setname(e.target.value);
    };

    const onChangeHandler1 = (e: any) => {
      set_face_pos(e.target.value);
    };

    const handleClick = () => {
      console.log(name);
      sendPrompt(name);
      sendPrompt_cal_attack_score(name);
      sendPrompt_smile_score();
    };

    return (
      <>
        <form>
          <div className="text-2xl">
            face mesh:
            <input
              value={face_pos}
              onChange={onChangeHandler1}
              type="text"
              name="face_pos"
              placeholder="face_pos"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "2px solid #ccc",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                fontSize: "22px",
                width: "90%",
                boxSizing: "border-box",
                marginBottom: "10px",
              }}
            /><br></br>
            name:
            <input
              value={name}
              onChange={onChangeHandler0}
              type="text"
              name="name"
              placeholder="name"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "2px solid #ccc",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                fontSize: "22px",
                width: "40%",
                boxSizing: "border-box",
                marginBottom: "10px",
              }}
            />
            <Button
              className="alertButton"
              onClick={handleClick}
              variant="contained"
              component="a"
              size="small"
              sx={{
                border: "None",
                padding: "10px", // パディングをゼロにする
                width: "200px",
                height: "60px",
                minWidth: "30px",
                backgroundColor: "rgb(231, 76, 60)",
                borderColor: "black",
                color: "white",
                borderRadius: "0.9rem",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              send
            </Button>
          </div>
        </form>
        <p className="text-3xl font-bold underline">name : {name}</p>
        <p className="text-3xl font-bold underline"> {output_data}</p>
        <p className="text-3xl font-bold underline">
          attack score : {attack_score}
        </p>
        <p className="text-3xl font-bold underline">
          face pos : {face_pos}
        </p>
        <p className="text-3xl font-bold underline">
          smile score : {smile_score}
        </p>
      </>
    );
  }

  return (
    <main>
      <h1 className="text-5xl">Name</h1>
      <Attack_Name_Button />
    </main>
  );
}
