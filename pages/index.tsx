import { Box } from "@mui/material";
import Header from "../components/header";
import MenuTab from "../components/menuTab";
import { useRouter } from "next/router";
import { imageURL } from "../components/openaiForm";

export default function Top() {
  const router = useRouter();
  const goCreateCard = () => {
    router.push("/createCard");
  };
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
