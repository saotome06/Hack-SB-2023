import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
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
  console.log("Start Contact");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  // フォーム送信時の処理（バリデーションOKな時に実行される）
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const response = await fetch("api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      router.push("/result_deathmile");
    } else {
      alert("正常に送信できませんでした");
    }
  };

  return (
    <>
      <main>
        <Container maxWidth="md">
          <Box mb={6}>
            <Typography align="center">
              必殺技名テストページ
              <br />
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Stack spacing={1} direction="column">
                <TextField
                  variant="outlined"
                  required
                  label="必殺技名"
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
                  送信
                </Button>
              </Stack>
            </FormControl>
          </Box>
          <Box height="20vh"></Box>
        </Container>
      </main>
    </>
  );
}

export default Contact;
