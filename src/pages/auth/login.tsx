import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/router";
import { useState } from "react";
import HeaderComponent from "@/components/HeaderComponent";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = trpc.auth.login.useMutation({
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      enqueueSnackbar("Sikeres bejelentkezés!", {
        variant: "success",
      });
      router.push(`/`);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoading) {
    return (
      <Container data-testid="group-list-loader">
        <Box>
          <Stack direction={"column"} spacing={2} sx={{ alignItems: "center" }}>
            <Typography>Az oldal töltődik</Typography>
            <CircularProgress />
          </Stack>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent />
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <Typography variant="h4">Bejelentkezés</Typography>
        <TextField
          placeholder="Email cím"
          type={"email"}
          fullWidth
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Jelszó"
          type={"password"}
          fullWidth
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          data-testid="login-button"
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={() =>
            mutate({
              email,
              password,
            })
          }
        >
          Bejelentkezés
        </Button>
      </Stack>
    </Container>
  );
};

export default LoginPage;
