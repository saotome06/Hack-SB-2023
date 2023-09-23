import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";
import styles from "../styles/loading.module.css";

export default function OpeaiForm() {
  function Attack_Name_Button() {
    const [name, setname] = useState("ちょーすごいパーンチ");
    const [attack_score, set_attack_score] = useState(1000);
    const [inputFormOn, setinputFormOn] = useState(true);
    const [output_data, set_randomData] = useState(
      "「ちょーすごいパーンチ」は、使用者が蓄積した集中力とエネルギーを一点に絞り、極限まで強化した拳を一瞬で放つ技。力の源は真剣勝負の熱量で、パンチが命中すれば周囲も巻き込むほどの衝撃波を生む。",
    );
    const [isLoadingText, setIsLoadingText] = useState(false);
    const [isLoadingAttackScore, setIsLoadingAttackScore] = useState(false);

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
      setIsLoadingText(true);
      setIsLoadingAttackScore(true);
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
      setIsLoadingText(false);
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
      setIsLoadingAttackScore(false);
    }

    const onChangeHandler0 = (e: any) => {
      setname(e.target.value);
    };

    const handleClick = () => {
      console.log(name);
      sendPrompt(name);
      sendPrompt_cal_attack_score(name);
      setinputFormOn(false);
    };

    return (
      <>
        {inputFormOn ? (
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                value={name}
                onChange={onChangeHandler0}
                label="必殺技を入力してください"
                variant="outlined"
                style={{ marginBottom: "10px", width: "80%", color: "white" }}
              />
              <Button
                onClick={handleClick}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "rgb(231, 76, 60)",
                  color: "white",
                  width: "80%",
                }}
              >
                決定
              </Button>
            </div>
          </form>
        ) : (
          <>
            <Box
              sx={{
                padding: "5px",
                margin: "auto",
                border: "3px solid black",
                fontSize: "20px",
              }}
            >
              <p className="text-3xl font-bold underline">【必殺技】</p>
              <p className="text-3xl font-bold underline">{name}</p>
              <p className="text-3xl font-bold underline">【効果】</p>
              {isLoadingText ? (
                // <div className={styles.loopings}>
                //   <div className={styles.rhombus}></div>
                //   <div className={styles.rhombus}></div>
                //   <div className={styles.rhombus}></div>
                // </div>
                <p>Loading...</p>
              ) : (
                <p className="text-3xl font-bold underline">{output_data}</p>
              )}
              <Box
                sx={{
                  borderTop: "3px solid white",
                  textAlign: "right",
                }}
              >
                {isLoadingAttackScore ? (
                  // <div className={styles.loopings}>
                  //   <div className={styles.rhombus}></div>
                  //   <div className={styles.rhombus}></div>
                  //   <div className={styles.rhombus}></div>
                  // </div>
                  <p>Loading...</p>
                ) : (
                  <p className="text-3xl font-bold underline">
                    ATK/{attack_score}
                  </p>
                )}
              </Box>
            </Box>
          </>
        )}
      </>
    );
  }

  return (
    <main>
      {/* <h1 className="text-5xl">Name</h1> */}
      <Attack_Name_Button />
    </main>
  );
}
