import { useRef } from "react";
import React from "react";

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  initVideoCamera();

  function initVideoCamera() {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((e) => console.log(e));
    }
  }

  /**
   * 写真の初期描画
   */
  if (canvasRef.current) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
      const photo = document.querySelector("#photo") as HTMLImageElement;
      photo.src = canvas.toDataURL("image/png");
    }
  }

  /**
   * 写真の撮影描画
   */
  function photoShoot() {
    const drawSize = calcDrawSize();
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      canvas.width = drawSize.width;
      canvas.height = drawSize.height;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photo = document.querySelector("#photo") as HTMLImageElement;
        photo.src = canvas.toDataURL("image/png");
        saveCanvasAsImage(canvas);
      }
    }
  }

  /**
   * 画像を保存する
   */
  function saveCanvasAsImage(canvas: HTMLCanvasElement) {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "photo.png";
    a.click();
  }

  /**
   * 描画サイズの計算
   * 縦横比が撮影(video)が大きい時は撮影の縦基準、それ以外は撮影の横基準で計算
   */
  function calcDrawSize() {
    if (videoRef.current) {
      const video = videoRef.current;
      const videoRatio = video.videoHeight / video.videoWidth;
      const viewRatio = video.clientHeight / video.clientWidth;
      return videoRatio > viewRatio
        ? { height: video.clientHeight, width: video.clientHeight / videoRatio }
        : { height: video.clientWidth * videoRatio, width: video.clientWidth };
    }
    return { height: 0, width: 0 };
  }

  return (
    <>
      <video ref={videoRef} id="video" autoPlay />
      <canvas ref={canvasRef} />
      <button id="shoot" onClick={photoShoot}>
        写真を撮る
      </button>
      <img id="photo" alt="Captured Photo" />
    </>
  );
}
