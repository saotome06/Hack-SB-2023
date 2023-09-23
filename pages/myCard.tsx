import { cardImage } from "../components/card";
import {
  imageURL,
  myCardName,
  myDeteil,
  myName,
  myScore,
} from "../components/openaiForm";
import { Box } from "@mui/material";

export default function MyCard() {
  return (
    <Box
      sx={{
        // fontFamily: card_font,
        border: "1px solid black",
        margin: "auto",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
        backgroundImage: `url(${imageURL})`,
        // backgroundImage: "url('https://yazirusis.com/mate_image/fusion01.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        style={{
          width: "100%",
          marginTop: "40px",
          height: "auto",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        src={cardImage}
      />
      <Box
        sx={{
          textAlign: "left",
          width: "100%",
          marginTop: "20px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        <Box
          sx={{
            padding: "5px",
            margin: "auto",
            fontSize: "20px",
            backgroundColor: "#ddd",
            color: "black",
            boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
            opacity: 0.8,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 15,
              padding: "5px",
              backgroundColor: "#ddd",
              color: "black",
              width: "330px",
              boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
              opacity: 0.8,
            }}
          >
            <a>{myCardName}</a>
          </Box>
          <Box
            sx={{
              fontSize: "15px",
            }}
          >
            <p className="text-3xl font-bold underline">【必殺技】</p>
            <p className="text-3xl font-bold underline">{myName}</p>
            <p className="text-3xl font-bold underline">【効果】</p>
            <p className="text-3xl font-bold underline"> {myDeteil}</p>
          </Box>
          <Box
            sx={{
              borderTop: "3px solid white",
              textAlign: "right",
            }}
          >
            <p className="text-3xl font-bold underline">ATK/{myScore}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
