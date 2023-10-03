import { Box } from "@mui/material";

export default function MenuTab(props: any) {
  return (
    <Box
      sx={{
        width: "45%",
        margin: "auto",
        backgroundColor: props.color || "#ff9900",
        borderRadius: "10px",
      }}
      onClick={props.onClick}
    >
      <img src={props.imgSrc} width="100%" />
    </Box>
  );
}
