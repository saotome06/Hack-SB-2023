import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";
import axios from "axios";
import { useRouter } from "next/router";

export let imageURL = "";
export let myName = "";
export let myCardName = "";
export let myDeteil = "";
export let myScore = "";

export default function OpeaiForm() {
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
    // const [isLoadingText, setIsLoadingText] = useState(false);
    // const [isLoadingAttackScore, setIsLoadingAttackScore] = useState(false);

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
      //   setIsLoadingText(true);
      //   setIsLoadingAttackScore(true);
      const content = prompt_base + "技名[" + prompt + "]";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content }],
        model: "gpt-4",
      });

      console.log(completion);
      const answer = completion.choices[0].message?.content;
      console.log(answer);
      await set_randomData(answer);
      myDeteil = answer;
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

      console.log("end");
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
      await set_attack_score(Math.round(random_Data));
      myScore = String(Math.round(random_Data));
      console.log(number, random_Data);
      //   setIsLoadingAttackScore(false);
    }

    const onChangeHandler0 = (e: any) => {
      setname(e.target.value);
      myName = e.target.value;
    };

    const handleClick = () => {
      console.log(name);
      sendPrompt(name);
      sendPrompt_cal_attack_score(name);
      setinputFormOn(false);
      sendPrompt_create_image(name);
    };

    useEffect(() => {
      myCardName != "" ? goMyCard() : console.log("wait");
    }, [myCardName]);

    async function sendPrompt_create_image(prompt = "") {
      if (prompt.length == 0) {
        alert("name empty");
        return;
      }
      /*
        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
        
        const content =
            "必殺技名[" +
            prompt +
            "]をよく表した画像を作って．芸術的で抽象的でユーモアのある画像にして．";
        const completion = await openai.image.completions.create({
            messages: [{ role: "user", content: content }],
            model: "gpt-4",
        });

        const answer = completion.choices[0].message?.content;
        console.log(answer);
        */
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
          </form>
        ) : (
          <>カード生成中</>
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
