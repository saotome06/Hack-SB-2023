import { Box } from "@mui/material";
import Contact from "./SpecialMoveForm";
import OpeaiForm from "./openaiForm";

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
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        style={{
          width: "100%",
          marginTop: "10px",
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
        }}
      >
        <OpeaiForm />
      </Box>
    </Box>
  );
}
