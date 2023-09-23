import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";

export default function OpeaiForm() {
  function Attack_Name_Button() {
    const [name, setname] = useState("");
    const [card_name, set_card_name] = useState("loading...");
    const [attack_score, set_attack_score] = useState(1000);
    const [inputFormOn, setinputFormOn] = useState(true);
    const [output_data, set_randomData] = useState("loading...");
    // const [isLoadingText, setIsLoadingText] = useState(false);
    // const [isLoadingAttackScore, setIsLoadingAttackScore] = useState(false);

    async function sendPrompt(prompt = "") {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

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
      //   setIsLoadingText(true);
      //   setIsLoadingAttackScore(true);
      const content = prompt_base + "技名[" + prompt + "]";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      set_randomData(answer);
      const content1 =
        "必殺技名，必殺技の説明，顔写真の画像の情報があります．これらの情報の特徴をよく表したセンスあるいい感じの名前を考えてください．名前は5文字以上20文字以内です．返答は名前のみ返してください．使う情報は以下のとおりです\n" +
        "必殺技名: " +
        prompt +
        "，必殺技の説明: " +
        answer;
      const completion1 = await openai.chat.completions.create({
        messages: [{ role: "user", content: content1 }],
        model: "gpt-4",
      });
      const answer1 = completion1.choices[0].message?.content;
      answer1
        .replace("[", "")
        .replace("]", "")
        .replace('"', "")
        .replace("「", "")
        .replace("」", "")
        .replace('"', "");
      console.log(answer1);
      set_card_name(answer1);
    }

    async function sendPrompt_cal_attack_score(prompt = "") {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const content =
        "技名[" +
        prompt +
        "]の表現がどれぐらい強そうな印象を与えられているのかを10以上10000以下の数値で評価してください．";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      const regex = /[^0-9]/g;
      const result = answer.replace(regex, "");
      let number = parseInt(result);
      if (isNaN(number)) number = 100;
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
      //   setIsLoadingAttackScore(false);
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
            <Box
              sx={{
                padding: "5px",
                margin: "auto",
                fontSize: "20px",
                backgroundColor: "white",
                opacity: 0.8,
                color: "black",
                boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
              }}
            >
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
                  placeholder="必殺技名を入力してください"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                <Button
                  onClick={handleClick}
                  variant="contained"
                  size="large"
                  sx={{
                    border: "None",
                    padding: "10px",
                    width: "80%",
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
                  決定
                </Button>
              </div>
            </Box>
          </form>
        ) : (
          <>
            <Box
              sx={{
                padding: "5px",
                margin: "auto",
                fontSize: "20px",
                backgroundColor: "white",
                opacity: 0.7,
                color: "black",
                boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  backgroundColor: "white",
                  opacity: 0.7,
                  width: "325px",
                  boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
                }}
              >
                <a>{card_name}</a>
              </Box>
              <Box
                sx={{
                  fontSize: "15px",
                }}
              >
                <p className="text-3xl font-bold underline">【必殺技】</p>
                <p className="text-3xl font-bold underline">{name}</p>
                <p className="text-3xl font-bold underline">【効果】</p>
                <p className="text-3xl font-bold underline"> {output_data}</p>
              </Box>
              <Box
                sx={{
                  borderTop: "1px solid black",
                  textAlign: "right",
                }}
              >
                <p className="text-3xl font-bold underline">
                  ATK/{attack_score}
                </p>
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
