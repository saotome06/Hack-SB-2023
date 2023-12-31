import { useState } from "react";
import { Button, TextField } from "@mui/material";
import OpenAI from "openai";
import styles from "../styles/loading.module.css";
import axios from "axios";

export default function Home() {
  function Attack_Name_Button() {
    const [name, setname] = useState("ちょうすごいパーンチ");
    const [attack_score_by_name, set_attack_score_by_name] = useState(1000);
    const [card_name, set_card_name] = useState("超すごい人");
    const [rarity, setrarity] = useState(1);
    const [output_data, set_randomData] = useState(
      "「ちょーすごいパーンチ」は、使用者が蓄積した集中力とエネルギーを一点に絞り、極限まで強化した拳を一瞬で放つ技。力の源は真剣勝負の熱量で、パンチが命中すれば周囲も巻き込むほどの衝撃波を生む。",
    );
    const [face_pos, set_face_pos] = useState(
      "{MOUTH:[58, 65, 87, 98, 58, 64, 71, 85, 83, 72, 68, 66, 98, 87, 86, 93, 86, 89, 87, 96, 78, 76, 58, 64, 69, 79, 77, 69, 67, 66, 98, 87, 84, 90, 82, 85, 86, 95, 73, 72], LEFT_EYE:[58, 61, 27, 49, 43, 37, 32, 28, 33, 39, 44, 51, 55, 54, 28, 58], RIGHT_EYE:[37, 39, 12, 32, 27, 22, 17, 14, 17, 22, 27, 32, 36, 35, 14, 38] LEFT_MAYU:[71, 55, 64, 25, 70, 42, 46, 60, 33, 33, 28], RIGHT_MAYU:[46, 39, 44, 19, 46, 32, 35, 47, 43, 27]}",
    );
    const [smile_score, set_smile_score] = useState(1000);
    const [isLoadingText, setIsLoadingText] = useState(false);
    const [isLoadingAttackScore, setIsLoadingAttackScore] = useState(false);

    async function sendPrompt_rarity(prompt, prompt2) {
      if (prompt.length == 0) {
        return;
      }

      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      console.log("start");
      const score = prompt * 0.7 + prompt2 * 0.3;

      const content =
        "0~10000を範囲とした際に" +
        score +
        "の値で0~5段階でレア度を評価してください。高ければ高いほど良いとします。レア度の数値（一桁の数字）のみを答えてください";
      console.log(content);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      console.log(score);
      console.log(answer);
      const answerInt = parseInt(answer);
      setrarity(answerInt);
    }

    async function sendPrompt_smile_score(prompt = "") {
      if (prompt.length == 0) {
        return;
      }

      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      console.log("start");

      const content =
        "ちょっとした謎々です。MediaPipeのFaceMeshを使って、顔の点群を取得しました。MOUTHは口、LEFT_EYE,RIGHT_EYEはそれぞれの目、LEFT_MAYU, RIGHT_MAYUはそれぞれの眉を表しています。この数値がどんな表情をしているのか推察してみてください。ちなみに、この数値は鼻の頭らへんの番号6からのユークリッド距離を100倍したものです．" +
        prompt +
        "口が結構重要だと思います。目指すべきは笑顔です。ですので、それぞれを100点とした時のMOUTH、EYE、MAYUの3つの要素で笑顔度を示してください。最後の3行は絶対に結果のみを示してください。注意書きや但し書きなどを書かないでください．";
      console.log(content);
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      const answer = completion.choices[0].message?.content;
      const regex = /[^0-9]/g;
      const result = answer.replace(regex, "");
      let number = parseInt(result);
      console.log("end");

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
      set_smile_score(Math.round(random_Data));
      console.log(answer, number, random_Data);
    }

    async function sendPrompt(prompt = "") {
      if (prompt.length == 0) {
        return;
      }
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
      const content = prompt_base + "必殺技名: " + prompt + "";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      console.log(completion);
      const answer = completion.choices[0].message?.content;
      console.log(answer);
      setIsLoadingText(false);
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
        .replace("」", "");
      console.log(answer1);
      set_card_name(answer1);

      console.log("end");
    }

    async function sendPrompt_cal_attack_score(prompt = "") {
      if (prompt.length == 0) {
        alert("name empty");
        return;
      }
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
      set_attack_score_by_name(Math.round(random_Data));
      console.log(number, random_Data);
      setIsLoadingAttackScore(false);
    }

    const [imageURLs, setImageURLs] = useState([]);
    async function sendPrompt_create_image(prompt = "") {
      if (prompt.length == 0) {
        alert("name empty");
        return;
      }
      const content =
        "必殺技，" +
        prompt +
        "をよく表した画像を作って．画像は抽象的，連続的で滑らかなユーモアのある画像にして．特に色合いが大切です．";

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
          setImageURLs(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
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
      sendPrompt_smile_score(face_pos);
      sendPrompt_create_image(name);
      sendPrompt_rarity(smile_score, attack_score_by_name);
    };

    return (
      <>
        <form>
          <h1 className="text-5xl">card name : {card_name}</h1>
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
            />
            <br></br>
            name:
            {/* <input
              value={name}
              onChange={onChangeHandler0}
              type="text"
              name="name"
              placeholder="必殺技名を入力"
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
            /> */}
            <TextField
              value={name}
              variant="outlined"
              required
              label="必殺技名"
              onChange={onChangeHandler0}
              style={{
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
                padding: "10px",
                width: "120px",
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
        <p className="text-3xl font-bold underline">必殺技名 : {name}</p>

        {isLoadingAttackScore ? (
          <div className={styles.loopings}>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
          </div>
        ) : (
          <p className="text-3xl font-bold underline">
            attack score by name : {attack_score_by_name}
          </p>
        )}

        {isLoadingText ? (
          <div className={styles.loopings}>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
            <div className={styles.rhombus}></div>
          </div>
        ) : (
          <p className="text-3xl font-bold underline">{output_data}</p>
        )}
        <p className="text-3xl font-bold underline">face pos : {face_pos}</p>
        <p className="text-3xl font-bold underline">
          smile score : {smile_score}
        </p>

        <p className="text-4xl font-bold underline">
          attack score : {attack_score_by_name * 0.7 + smile_score * 0.3}
        </p>
        <p>レアリティ :{rarity}</p>

        <h1 className="text-5xl">create image</h1>
        <div className="mx-4 my-2 p-4 flex-auto bg-white shadow rounded-md">
          <p>生成結果：</p>
          {imageURLs.length > 0 && (
            <div className="flex">
              {imageURLs.map((item, key) => (
                <div className="mr-2" key={key}>
                  <img
                    key={key}
                    src={item.url}
                    alt={`generated image ${key}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <main>
      <Attack_Name_Button />
    </main>
  );
}
