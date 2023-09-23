import { Box } from "@mui/material";
import OpeaiForm from "./openaiForm";

const card_font = "ヒラギノ明朝 ProN";

export let cardImage = "";

export default function Card(props) {
  cardImage = props.imgSrc;
  return (
    <Box
      sx={{
        fontFamily: card_font,
        border: "1px solid black",
        margin: "auto",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
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
        src={props.imgSrc}
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
        <OpeaiForm data_face_mesh={props.data_face_mesh} />
        {/* <OpeaiForm data_face_mesh={props.data_face_mesh} /> */}
      </Box>
    </Box>
  );
}
