import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
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
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Bejelentkezés
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <TextField
          label="Email cím"
          type={"email"}
          fullWidth
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Jelszó"
          type={"password"}
          fullWidth
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
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
