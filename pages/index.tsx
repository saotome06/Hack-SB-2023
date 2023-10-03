import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Header from "../components/header";
import MenuTab from "../components/menuTab";
import { useRouter } from "next/router";
import { imageURL } from "../components/openaiForm";

export default function Top() {
  const router = useRouter();
  const goCreateCard = () => {
    router.push("/createCard");
  };

  const calculateDistances = (landmarks, canvas) => {
    const refPointX = landmarks[REF_POINT].x * canvas.width;
    const refPointY = landmarks[REF_POINT].y * canvas.height;
    const refPointZ = landmarks[REF_POINT].z * 100;

    // インデックスの配列に基づいて距離を計算する関数
    const computeDistanceForIndices = (indices) => {
      return indices.map((index) => {
        const pointX = landmarks[index].x * canvas.width;
        const pointY = landmarks[index].y * canvas.height;
        const pointZ = landmarks[index].z * 100;
        return Math.round(
          Math.sqrt((pointX - refPointX) ** 2 + (pointY - refPointZ) ** 2) +
            (pointZ - refPointY) ** 2,
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
  const goRanking = () => {
    router.push("/ranking");
  };
  const goGacha = () => {
    router.push("/gacha");
  };
  const goMyCard = () => {
    router.push("/myCard");
  };

  return (
    <>
      <Navbar />
      <Header />
      <Box
        sx={{
          display: "flex",
          padding: "10px",
        }}
      >
        <MenuTab imgSrc="./createCard.png" onClick={goCreateCard} />
        <MenuTab imgSrc="./ranking.png" onClick={goRanking} />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "10px",
        }}
      >
        <MenuTab imgSrc="./gacha.png" onClick={goGacha} />
        {imageURL != "" ? (
          <MenuTab imgSrc="./myCard.png" onClick={goMyCard} />
        ) : (
          <MenuTab imgSrc="./noCard.png" color="#ddd" />
        )}
      </Box>
    </>
  );
}
