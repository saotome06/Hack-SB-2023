import { useRef, useState } from "react";
import {
  REF_POINT,
  MOUTH_INDEX,
  L_EYE_INDEX,
  L_MAYU_INDEX,
  R_EYE_INDEX,
  R_MAYU_INDEX,
} from "../common/constants";
import { Box, Button } from "@mui/material";
import Card from "../components/card";
import Navbar from "../components/Navbar";
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";
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
let data_face_mesh = "";
let faceImageURL = "";

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

  const calculateDistances = (landmarks, canvas) => {
    const refPointX = landmarks[REF_POINT].x * canvas.width;
    const refPointY = landmarks[REF_POINT].y * canvas.height;

    // インデックスの配列に基づいて距離を計算する関数
    const computeDistanceForIndices = (indices) => {
      return indices.map((index) => {
        const pointX = landmarks[index].x * canvas.width;
        const pointY = landmarks[index].y * canvas.height;
        return Math.round(
          Math.sqrt((pointX - refPointX) ** 2 + (pointY - refPointY) ** 2),
        );
      });
    };

    const mouthDistances = computeDistanceForIndices(MOUTH_INDEX);
    const lEyeDistances = computeDistanceForIndices(L_EYE_INDEX);
    const rEyeDistances = computeDistanceForIndices(R_EYE_INDEX);
    const lMayuDistances = computeDistanceForIndices(L_MAYU_INDEX);
    const rMayuDistances = computeDistanceForIndices(R_MAYU_INDEX);

    return `{MOUTH:[${mouthDistances.join(
      ", ",
    )}], LEFT_EYE:[${lEyeDistances.join(
      ", ",
    )}], RIGHT_EYE:[${rEyeDistances.join(
      ", ",
    )}] LEFT_MAYU:[${lMayuDistances.join(
      ", ",
    )}], RIGHT_MAYU:[${rMayuDistances.join(", ")}]}`;
  };

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
      // await supabase.from("sample").insert([
      //   {
      //     fileName: fileName,
      //     src: src,
      //   },
      // ]);
    }

    const faceMesh = new FaceMesh({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.onResults((results: { multiFaceLandmarks: any }) => {
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          data_face_mesh = calculateDistances(landmarks, canvas);
          // setDistances(distancesStr);
          // console.log(data_face_mesh);
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
          maxWidth: "80%",
          margin: "auto",
        }}
      >
        <h1 className="text-5xl font-bold underline">Title Title</h1>
        {!flagURL ? (
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
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: "white",
                    padding: "10px",
                    margin: "auto",
                    maxWidth: "375px",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      padding: "10px",
                      margin: "auto",
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
                position: "relative",
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
                  padding: "10px",
                  maxWidth: "375px",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                }}
              
            ></video>
            <canvas
              ref={canvasRef}
              id="output"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
                width: "95%",
                height: "auto",
                display: camButton ? "block" : "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            ></canvas>
          </div>
        </Box>
      ) : (
        <Card
          imgSrc={dataURL}
          data_face_mesh={data_face_mesh}
          faceSrc={faceImageURL}
        />
      )}
    </div>
    </>
  );
}
