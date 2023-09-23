import { useState } from 'react'
import { Button } from '@mui/material';
import OpenAI from 'openai';


export default function Home() {
  
  function Attack_Name_Button() {
    const [name, setname] = useState('すごいパンチ')
    const [attack_score, set_attack_score] = useState(1000)
    const [output_data, set_randomData] = useState('name')

    
    async function sendPrompt(prompt = '') {
      console.log(prompt)
      //console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
      //.env.local に NEXT_PUBLIC_OPENAI_API_KEY=xxxxxxxxxxxxxxを入れる
      
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
      console.log("start")
      
      
      const content = "必殺技の名前を言うので，技の説明を30文字程度でしてください．技名[" + prompt + "]"
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: content }],
        model: "gpt-4",
      });
      
      console.log(completion);
      const answer = completion.choices[0].message?.content 
      console.log(answer)
      console.log("end")
      set_randomData(answer);

    }

    
    
    const onChangeHandler0 = (e: any) => {
      setname(e.target.value)
    }
    
    
    const handleClick = () => {
      const random_Data = 10000.0 + 10.0*Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
      set_attack_score(random_Data);

      console.log(name);
      sendPrompt(name);
    };


    return (
      <>
      <form>
          <div className="text-2xl">name:
          <input value={name} onChange={onChangeHandler0} type='text' name='name' placeholder='name' 
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            fontSize: '22px',
            width: '40%',
            boxSizing: 'border-box',
            marginBottom: '10px'
          }}/>
         　　
          <Button className="alertButton" onClick={handleClick}
              variant="contained"
              component="a"
              size="small"
              sx={{
                border: 'None',
                padding: '10px', // パディングをゼロにする
                width: '200px', 
                height: '60px',
                minWidth: '30px',
                backgroundColor: 'rgb(231, 76, 60)',
                borderColor: 'black',
                color: 'white',
                borderRadius: '0.9rem',
                fontSize: '20px',
                cursor: 'pointer',
              }}
          >
            send
      </Button>
      </div>
      </form>
      <p className="text-3xl font-bold underline">name : {name}</p>
      <p className="text-3xl font-bold underline"> {output_data}</p>
      <p className="text-3xl font-bold underline">attack score : {attack_score}</p>

      </>
      
    );
  }

  
  return (
    <main>
      <h1 className="text-5xl">Name</h1>
      <Attack_Name_Button />
    </main>
  )
}