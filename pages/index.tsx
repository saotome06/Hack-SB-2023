import { useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  REF_POINT,
  MOUTH_INDEX,
  L_EYE_INDEX,
  L_MAYU_INDEX,
  R_EYE_INDEX,
  R_MAYU_INDEX,
} from "../common/constants";

let FaceMesh: new (arg0: { locateFile: (file: any) => string }) => any;
if (typeof window !== "undefined") {
  FaceMesh = require("@mediapipe/face_mesh").FaceMesh;
}

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
