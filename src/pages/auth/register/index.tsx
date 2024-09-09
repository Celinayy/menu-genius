import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import router from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = trpc.user.create.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeres regisztráció!", {
        variant: "success",
      });
      router.push(`/auth/login`);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const [name, setName] = useState("");
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
        <Typography variant="h4">Regisztráció</Typography>
        <TextField
          fullWidth
          placeholder="Név"
          value={name}
          disabled={isLoading}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Email cím"
          type={"email"}
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Jelszó"
          type={"password"}
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          data-testid="register-button"
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={() =>
            mutate({
              name,
              email,
              password,
            })
          }
        >
          Regisztráció
        </Button>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
