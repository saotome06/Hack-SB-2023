import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

// フォームの型
type ContactForm = {
  name: string;
  email: string;
  message: string;
};

// バリーデーションルール
const schema = yup.object({
  name: yup.string().required("必須項目です"),
});

function Contact() {
  const [DeathblowName, setDeathblowName] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  console.log("2 Contact");

  // フォーム送信時の処理（バリデーションOKな時に実行される）
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const response = await fetch("/api/deathmile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setDeathblowName(data.name);
    if (response.status === 200) {
      router.push("/");
    } else {
      console.log("正常に送信できませんでした");
    }
  };

  return (
    <>
      {DeathblowName ? (
        <>
          <h1>必殺技</h1>
          <p>
            {DeathblowName}
            <b>!!!!!!!!!!!!!</b>
          </p>
        </>
      ) : (
        <main>
          <Container maxWidth="md">
            <Box>
              <FormControl fullWidth>
                <Stack spacing={1} direction="column">
                  <TextField
                    variant="outlined"
                    required
                    label="必殺技名をいれてください"
                    {...register("name")}
                    error={"name" in errors}
                    helperText={errors.name?.message}
                  />
                </Stack>
                <Stack alignItems="center" mt={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    sx={{ width: "200px" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    決定
                  </Button>
                </Stack>
              </FormControl>
            </Box>
            <Box height="20vh"></Box>
          </Container>
        </main>
      )}
    </>
  );
}

export default Contact;
