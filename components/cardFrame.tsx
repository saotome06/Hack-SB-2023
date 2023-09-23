import { Box } from "@mui/material";

export default function CardFrame(props) {
  return (
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
          fontSize: "20px",
          top: 15,
          padding: "4px",
          backgroundColor: "#ddd",
          color: "black",
          width: "95%",
          boxShadow: "0px 0px 0px 3px white, 0px 0px 0px 4px white",
          opacity: 0.8,
          fontWeight: "bold",
        }}
      >
        <a>{props.myCardName.replace('"', "").replace('"', "")}</a>
      </Box>
      <img
        style={{
          width: "300px",
          marginTop: "10px",
          height: "250px",
          objectFit: "cover",
          borderRadius: "10px",
          boxShadow:
            "0px 0px 20px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        src={props.cardImage}
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
              fontSize: "13px",
            }}
          >
            <p className="text-3xl font-bold underline">
              【必殺技】{props.myName}
            </p>
            <p className="text-3xl font-bold underline"> {props.myDetail}</p>
          </Box>
          <Box
            sx={{
              borderTop: "3px solid white",
              textAlign: "right",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            <p className="text-3xl font-bold underline">ATK/{props.myScore}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
