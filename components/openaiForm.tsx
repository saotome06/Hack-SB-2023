import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/loading.module.css";

export let imageURL = "";
export let myName = "";
export let myCardName = "";
export let myDetail = "";
export let myScore = 0;
export let myScoreAttackName = 0;
export let myScoreSmile = 0;

export default function OpeaiForm(props) {
  function Attack_Name_Button() {
    const [name, setname] = useState("");
    const [card_name, set_card_name] = useState("お待ちください");
    const [attack_score, set_attack_score] = useState(1000);
    const [inputFormOn, setinputFormOn] = useState(true);
    const [output_data, set_randomData] = useState("お待ちください");
    const router = useRouter();
    const goMyCard = () => {
      router.push("/myCard");
    };

    async function sendPrompt_smile_score(prompt = "") {
      if (prompt.length == 0) {
        return;
      }

      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const content =
        "ちょっとした謎々です。MediaPipeのFaceMeshを使って、顔の点群を取得しました。MOUTHは口、LEFT_EYE,RIGHT_EYEはそれぞれの目、LEFT_MAYU, RIGHT_MAYUはそれぞれの眉を表しています。この数値がどんな表情をしているのか推察してみてください。ちなみに、この数値は鼻の頭らへんの番号6からのユークリッド距離を100倍したものです．" +
        prompt +
        "口が結構重要だと思います。目指すべきは笑顔です。MOUTH、EYE、MAYUの3つの要素をヒントにして，笑顔度を0以上100以下の数値で評価してください。怒った顔に近いものはは0，笑顔に近いものは100としてください．絶対に数字の結果のみを示してください。注意書きや但し書きなどを書かないでください．";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      const regex = /[^0-9]/g;
      const result = answer.replace(regex, "");
      let number = parseInt(result);

      if (isNaN(number)) {
        number = 1;
      }
      if (number >= 100) number = 100;
      let random_Data =
        number +
        number *
          0.1 *
          Math.sqrt(-2 * Math.log(1 - Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
      random_Data *= 100;
      if (random_Data < 0) random_Data = 100;
      myScore += 0.2 * Math.round(random_Data);
      myScore = Math.floor(myScore);
      myScoreSmile = Math.round(random_Data);
      console.log(answer, number, random_Data);
    }

    async function sendPrompt(prompt = "") {
      //console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
      //.env.local に NEXT_PUBLIC_OPENAI_API_KEY=xxxxxxxxxxxxxxを入れる

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
      const content = prompt_base + "技名[" + prompt + "]";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      await set_randomData(answer);
      myDetail = answer;
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
        .replace("」", "");
      console.log(answer1);
      await set_card_name(answer1);
      myCardName = answer1;
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
      const number = parseInt(result);
      let random_Data =
        Math.random() * 1000 +
        number +
        number *
          0.1 *
          Math.sqrt(-2 * Math.log(1 - Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
      if (random_Data < 0) random_Data = 100;
      await set_attack_score(Math.round(random_Data));
      myScore += 0.8 * Math.round(random_Data);
      myScore = Math.floor(myScore);
      myScoreAttackName = Math.round(random_Data);
      console.log(number, random_Data);
      //   setIsLoadingAttackScore(false);
    }

    const onChangeHandler0 = (e: any) => {
      setname(e.target.value);
      myName = e.target.value;
    };

    const handleClick = () => {
      if (name.length == 0) {
        alert("name empty");
        return;
      }
      console.log(name);
      sendPrompt(name);
      myScore = 0.0;
      sendPrompt_cal_attack_score(name);
      sendPrompt_smile_score(props.data_face_mesh);
      sendPrompt_create_image(name);
      setinputFormOn(false);
    };

    useEffect(() => {
      myCardName != "" ? goMyCard() : console.log("wait");
    }, [myCardName]);

    async function sendPrompt_create_image(prompt = "") {
      if (prompt.length == 0) {
        alert("name empty");
        return;
      }

      const content =
        "必殺技，" +
        prompt +
        "をよく表した画像を作って．画像は非現実的，芸術的，抽象的な画像にして．";

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            model: "image-alpha-001",
            prompt: content,
            size: "256x256",
            num_images: 1,
            response_format: "url",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          },
        );
        if (response.data && response.data.data) {
          imageURL = response.data.data[0].url;
          myCardName != "" ? goMyCard() : console.log("wait");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <>
        {inputFormOn ? (
          <form>
            <Box
              sx={{
                fontSize: "30px",
                top: 15,
                padding: "4px",
                color: "black",
                width: "95%",
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
                <Box
                  sx={{
                    display: "none",
                  }}
                >
                  {card_name}
                  {attack_score}
                  {output_data}
                  {card_name}
                </Box>
              </div>
            </Box>
          </form>
        ) : (
          <>
          カード生成中
          <div className={styles.loopings}>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
          </div>
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
