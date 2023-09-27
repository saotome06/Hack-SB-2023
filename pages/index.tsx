import { useRef, useState } from "react";
import {
  // REF_POINT,
  MOUTH_INDEX,
  L_EYE_INDEX,
  L_MAYU_INDEX,
  R_EYE_INDEX,
  R_MAYU_INDEX,
} from "../common/constants";
import { Box, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";
import OpeaiForm from "../components/openaiForm";
const card_font = "ヒラギノ明朝 ProN";
// import {
//   LandmarkConnectionArray,
//   drawConnectors,
//   drawLandmarks,
// } from "@mediapipe/drawing_utils";

// let FaceLandmarker: {
//   FACE_LANDMARKS_TESSELATION: LandmarkConnectionArray | undefined;
// };
// if (typeof window !== "undefined") {
//   FaceLandmarker = require("@mediapipe/tasks-vision").FaceLandmarker;
// }

let FaceMesh: new (arg0: { locateFile: (file: any) => string }) => any;
if (typeof window !== "undefined") {
  FaceMesh = require("@mediapipe/face_mesh").FaceMesh;
}

let dataURL = "";
const data_face_mesh = "";
export let faceImageURL = "";

export default function FaceMesher() {
  // const [distances, setDistances] = useState("");
  const [flagURL, setflagURL] = useState(false);
  const [camButton, setcamButton] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    if (
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    setcamButton(false);
  };

  // const calculateDistances = (landmarks, canvas) => {
  //   const refPointX = landmarks[REF_POINT].x * canvas.width;
  //   const refPointY = landmarks[REF_POINT].y * canvas.height;

  //   // インデックスの配列に基づいて距離を計算する関数
  //   const computeDistanceForIndices = (indices) => {
  //     return indices.map((index) => {
  //       const pointX = landmarks[index].x * canvas.width;
  //       const pointY = landmarks[index].y * canvas.height;
  //       return Math.round(
  //         Math.sqrt((pointX - refPointX) ** 2 + (pointY - refPointY) ** 2),
  //       );
  //     });
  //   };

  //   const mouthDistances = computeDistanceForIndices(MOUTH_INDEX);
  //   const lEyeDistances = computeDistanceForIndices(L_EYE_INDEX);
  //   const rEyeDistances = computeDistanceForIndices(R_EYE_INDEX);
  //   const lMayuDistances = computeDistanceForIndices(L_MAYU_INDEX);
  //   const rMayuDistances = computeDistanceForIndices(R_MAYU_INDEX);

  //   return `{MOUTH:[${mouthDistances.join(
  //     ", ",
  //   )}], LEFT_EYE:[${lEyeDistances.join(
  //     ", ",
  //   )}], RIGHT_EYE:[${rEyeDistances.join(
  //     ", ",
  //   )}] LEFT_MAYU:[${lMayuDistances.join(
  //     ", ",
  //   )}], RIGHT_MAYU:[${rMayuDistances.join(", ")}]}`;
  // };

  const processCameraFrame = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    dataURL = canvas.toDataURL();

    console.log(`dataURL: ${dataURL}`);

    // 画像をアップロード
    const api_key = process.env.NEXT_PUBLIC_SUPABASE_KEY;

    const supabase = createClient(
      "https://zogqrpdjhulkzbvpuwud.supabase.co",
      api_key,
    );

    // dataURLを,で分割
    const dataURL_split = dataURL.split(",");
    const dataURL_base64 = dataURL_split[1];

    // 文字列をランダムに生成
    const fileName = Math.random().toString(32).substring(2) + ".png";
    console.log(`fileName: ${fileName}`);
    const { data: inputData, error } = await supabase.storage
      .from("image")
      .upload(fileName, decode(dataURL_base64), {
        contentType: "image/png",
      });
    if (error) {
      console.log(error);
    } else {
      console.log(inputData);

      const publicURL = await supabase.storage
        .from("image")
        .getPublicUrl(fileName);

      const src = publicURL.data.publicUrl;
      faceImageURL = src;
      console.log(`FileName: ${fileName}, publicURL: ${src}`);

      // // DBにレコード作成
      await supabase.from("sample").insert([
        {
          fileName: fileName,
          src: src,
        },
      ]);
    }

    const faceMesh = new FaceMesh({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    // faceMesh.onResults((results: { multiFaceLandmarks: any }) => {
    //   if (results.multiFaceLandmarks) {
    //     for (const landmarks of results.multiFaceLandmarks) {
    //       data_face_mesh = calculateDistances(landmarks, canvas);
    //       // setDistances(distancesStr);
    //       // console.log(data_face_mesh);
    //     }
    //   }
    // });
    const base_point = 6;
    faceMesh.onResults((results: { multiFaceLandmarks: any }) => {
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          const ctx = canvasRef.current.getContext("2d");

          ctx.arc(
            landmarks[base_point].x * canvas.width,
            landmarks[base_point].y * canvas.height,
            2,
            0,
            2 * Math.PI,
          );
          ctx.fillStyle = "#00FF00";
          ctx.fill();

          // 各インデックス配列をループして特徴点を描画
          // for (const index of [...left_eye_indices, ...right_eye_indices, ...mouth_indices, ...eyebrow_indices]) {
          for (const index of [
            ...MOUTH_INDEX,
            ...L_EYE_INDEX,
            ...R_EYE_INDEX,
            ...L_MAYU_INDEX,
            ...R_MAYU_INDEX,
          ]) {
            const point = landmarks[index];
            ctx.beginPath();
            //ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.arc(
              point.x * canvas.width,
              point.y * canvas.height,
              2,
              0,
              2 * Math.PI,
            );
            ctx.fillStyle = "#FF0000";
            ctx.fill();
          }
        }
      }
    });

    try {
      await faceMesh.send({ image: canvas });
    } catch (error) {
      console.error("Error processing the image:", error);
    }
    setflagURL(true);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <h1>笑☆顔☆王</h1>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "80%",
          margin: "auto",
        }}
      >
        <Box>
          {camButton ? (
            <Button
              style={{
                border: "1px solid black",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
                width: "70%",
                marginTop: "50%",
                zIndex: 100,
              }}
              color="primary"
              variant="contained"
              onClick={startCamera}
            >
              カメラを起動
            </Button>
          ) : (
            <>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 20,
                  left: 0,
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: "white",
                  margin: "auto",
                }}
              >
                <Button
                  sx={{
                    border: "1px solid black",
                    padding: "10px",
                    display: !flagURL ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "auto",
                    width: "70%",
                    marginTop: "50%",
                    zIndex: 100,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={processCameraFrame}
                >
                  笑顔カードを作成する
                </Button>
              </Box>
            </>
          )}
          <div
            style={{
              margin: "auto",
              width: "100%",
              display: camButton ? "none" : "block",
            }}
          >
            <video
              ref={videoRef}
              id="video"
              autoPlay
              muted
              playsInline
              style={{
                margin: "auto",
                width: "100%",
                height: "auto",
                maxWidth: "375px",
                display: !flagURL ? "block" : "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            ></video>
            <Box
              sx={{
                fontFamily: card_font,
                border: "1px solid black",
                margin: "auto",
                width: "90%",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
                backgroundImage:
                  "url('https://yazirusis.com/mate_image/fusion01.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: !flagURL ? "none" : "block",
              }}
            >
              <Box
                sx={{
                  textAlign: "left",
                  width: "100%",
                  marginTop: "20px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <canvas
                  ref={canvasRef}
                  id="output"
                  style={{
                    margin: "auto",
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                ></canvas>
                <OpeaiForm
                  sx={{
                    backgroundColor: "white",
                  }}
                  data_face_mesh={data_face_mesh}
                  faceSrc={faceImageURL}
                />
              </Box>
            </Box>
          </div>
        </Box>
      </div>
    </>
  );
}
