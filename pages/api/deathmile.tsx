import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  async function sendPrompt_attack_name(prompt = "") {
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
    //console.log(answer);
    return answer;
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
    if (isNaN(random_Data) || random_Data < 0) random_Data = 100;
    //console.log(Math.round(random_Data));
    return Math.round(random_Data);
  }

  console.log("API Start");
  console.log(req.body);
  const data = req.body;

  const attack_name_desc = await sendPrompt_attack_name(data.name);
  const attack_score = await sendPrompt_cal_attack_score(data.name);

  console.log(data.name);
  console.log(attack_name_desc);
  console.log(attack_score);

  if (req.method === "POST") {
    return res
      .status(200)
      .json({ attack_name_desc: attack_name_desc, attack_score: attack_score });
  }
}

export const middleware = bodyParser.json();
