import { Box } from "@mui/material";
import OpeaiForm from "./openaiForm";

// const card_font = "ヒラギノ明朝 ProN";

export default function Card(props) {
  return (
    <Box
      sx={{
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
        // backgroundImage: "url('https://yazirusis.com/mate_image/fusion01.png')",
        backgroundImage: "url(https://source.unsplash.com/random/800x200)",
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
        src={props.imgSrc}
      />
      <Box
        sx={{
          textAlign: "left",
          width: "100%",
          marginTop: "20px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <OpeaiForm />
      </Box>
    </Box>
  );
}
