import { Box } from "@mui/material";
import Navbar from './Navbar'

export default function CardFrame(props) {
  return (
    <>
    <Navbar />
    <br></br>
    <Box
      sx={{
        // fontFamily: card_font,
        border: "1px solid black",
        margin: "auto",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px black",
        backgroundImage: `url(${props.imageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        maxWidth: "375px",
      }}
    >
      <Box
        sx={{
          fontSize: "30px",
          top: 15,
          padding: "4px",
          backgroundColor: "#ddd",
          color: "black",
          width: "95%",
          boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
          opacity: 0.8,
        }}
      >
        <a>{props.myCardName.replace('"', "").replace('"', "")}</a>
      </Box>
      <Box
        sx={{
          height: "250px",
          overflowY: "scroll",
        }}
      >
        <img
          style={{
            width: "100%",
            marginTop: "20px",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
          src={props.cardImage}
        />
      </Box>
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
              fontSize: "15px",
            }}
          >
            <p className="text-3xl font-bold underline">【必殺技】</p>
            <p className="text-3xl font-bold underline">{props.myName}</p>
            <p className="text-3xl font-bold underline">【効果】</p>
            <p className="text-3xl font-bold underline"> {props.myDetail}</p>
          </Box>
          <Box
            sx={{
              borderTop: "3px solid white",
              textAlign: "right",
            }}
          >
            <p className="text-3xl font-bold underline">ATK/{props.myScore}</p>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
    
  );
}
