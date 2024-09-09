import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Container,
  Typography,
  Grid2 as Grid,
  CardContent,
  Stack,
  TextField,
  Card,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

const SettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = trpc.user.find.useQuery();
  const { mutate } = trpc.user.update.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeres változtatás!", {
        variant: "success",
      });
      setName("");
      setNameAgain("");
      setEmail("");
      setEmailAgain("");
      setPassword("");
      setPasswordNew("");
      setPasswordNewAgain("");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const [name, setName] = useState("");
  const [nameAgain, setNameAgain] = useState("");

  const [email, setEmail] = useState("");
  const [emailAgain, setEmailAgain] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setPasswordNew] = useState("");
  const [newPasswordAgain, setPasswordNewAgain] = useState("");

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Felhasználó adatok
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Jelenlegi név
                  </Typography>
                  <TextField size="small" disabled value={data?.name} />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Új név
                  </Typography>
                  <TextField
                    size="small"
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Új név megerősítése
                  </Typography>
                  <TextField
                    size="small"
                    disabled={isLoading}
                    value={nameAgain}
                    onChange={(e) => setNameAgain(e.target.value)}
                  />
                </Stack>
                <Button
                  variant="contained"
                  disabled={isLoading || name !== nameAgain}
                  onClick={() =>
                    mutate({
                      name: name,
                    })
                  }
                >
                  Mentés
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Jelenlegi email cím
                  </Typography>
                  <TextField size="small" disabled value={data?.email} />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Új email cím
                  </Typography>
                  <TextField
                    size="small"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Új email cím megerősítése
                  </Typography>
                  <TextField
                    size="small"
                    disabled={isLoading}
                    value={emailAgain}
                    onChange={(e) => setEmailAgain(e.target.value)}
                  />
                </Stack>
                <Button
                  variant="contained"
                  disabled={isLoading || email !== emailAgain}
                  onClick={() =>
                    mutate({
                      email: email,
                    })
                  }
                >
                  Mentés
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;
