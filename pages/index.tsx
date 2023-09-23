import { useRef, useState } from "react";
import { Box } from "@mui/material";

let FaceMesh: new (arg0: { locateFile: (file: any) => string }) => any;
if (typeof window !== "undefined") {
  FaceMesh = require("@mediapipe/face_mesh").FaceMesh;
}

const REF_POINT = 6;
const MOUTH = [
  [80, 81],
  [311, 310],
  [178, 87],
  [181, 84],
  [181, 84],
  [82, 13],
  [87, 14],
  [39, 37],
  [310, 415],
  [267, 269],
  [61, 146],
  [317, 402],
  [78, 191],
  [191, 80],
  [375, 291],
  [37, 0],
  [84, 17],
  [314, 405],
  [13, 312],
  [270, 409],
  [312, 311],
  [318, 324],
  [324, 308],
  [61, 185],
  [78, 95],
  [91, 181],
  [321, 375],
  [0, 267],
  [409, 291],
  [14, 317],
  [88, 178],
  [95, 88],
  [40, 39],
  [17, 314],
  [415, 308],
  [185, 40],
  [81, 82],
  [269, 270],
  [405, 321],
  [146, 91],
  [402, 318],
];
const L_EYE = [
  [145, 153],
  [160, 159],
  [159, 158],
  [144, 145],
  [153, 154],
  [246, 161],
  [158, 157],
  [163, 144],
  [173, 133],
  [33, 7],
  [161, 160],
  [155, 133],
  [7, 163],
  [154, 155],
  [33, 246],
];
const L_MAYU = [
  [105, 66],
  [52, 65],
  [46, 53],
  [66, 107],
  [157, 173],
  [63, 105],
  [53, 52],
  [65, 55],
];
const R_EYE = [
  [381, 382],
  [382, 362],
  [390, 373],
  [263, 249],
  [374, 380],
  [387, 386],
  [380, 381],
  [249, 390],
  [466, 388],
  [373, 374],
  [384, 398],
  [263, 466],
  [386, 385],
  [398, 362],
  [388, 387],
  [385, 384],
];
const R_MAYU = [
  [283, 282],
  [300, 293],
  [282, 295],
  [296, 336],
  [334, 296],
  [276, 283],
  [293, 334],
  [295, 285],
];

const MOUTH_INDEX = Array.from(new Set(MOUTH.flat())).sort((a, b) => a - b);
const L_EYE_INDEX = Array.from(new Set(L_EYE.flat())).sort((a, b) => a - b);
const L_MAYU_INDEX = Array.from(new Set(L_MAYU.flat())).sort((a, b) => a - b);
const R_EYE_INDEX = Array.from(new Set(R_EYE.flat())).sort((a, b) => a - b);
const R_MAYU_INDEX = Array.from(new Set(R_MAYU.flat())).sort((a, b) => a - b);
let dataURL = "";

export default function FaceMesher() {
  // const [distances, setDistances] = useState("");
  const [flagURL, setflagURL] = useState(false);
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
    setflagURL(true);

    const faceMesh = new FaceMesh({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.onResults((results: { multiFaceLandmarks: any }) => {
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          const distancesStr = calculateDistances(landmarks, canvas);
          // setDistances(distancesStr);
          console.log(distancesStr);
        }
      }
    });

    try {
      await faceMesh.send({ image: canvas });
    } catch (error) {
      console.error("Error processing the image:", error);
    }
  };

  return (
    <div>
      {!flagURL ? (
        <>
          <button onClick={startCamera}>カメラを起動</button>
          <video
            ref={videoRef}
            width="600"
            height="400"
            id="video"
            autoPlay
            muted
            playsInline
          ></video>
          <button onClick={processCameraFrame}>写真を撮る</button>
          <canvas ref={canvasRef} id="output"></canvas>
        </>
      ) : (
        <>
          <Box
            sx={{
              border: "1px solid black",
              // padding: '10px',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              // textAlign: 'center',
              // margin: 'auto',
              // width: '70%',
              // height: 'auto',
              // marginTop: '20px',
            }}
          >
            <img
              style={{
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "600",
                height: "400",
              }}
              src={dataURL}
            />
            <h1>スコア</h1>
            <p>100000000000000000000000000000000000</p>
            <h1>効果</h1>
            <p>ああああああああああああああああああああああ</p>
          </Box>
        </>
      )}
    </div>
  );
}
