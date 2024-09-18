import HeaderComponent from "@/components/HeaderComponent";
import { withAuthentication } from "@/hoc/WithAuthentication";
import { trpc } from "@/trpc/client";
import { palettes } from "@/providers/ThemeProvider";
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
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { User, PaletteMode } from "@prisma/client";
import { useSnackbar } from "notistack";
import { useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export type SettingsPageProps = {
  user: User;
};

const SettingsPage = ({ user }: SettingsPageProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = trpc.user.update.useMutation({
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

  const options: { label: string; value: PaletteMode }[] = [
    {
      label: "Sötét barna",
      value: "DARK_BROWN",
    },
    {
      label: "Sötét kék",
      value: "DARK_BLUE",
    },
    {
      label: "Zöld",
      value: "GREEN",
    },
    {
      label: "Rózsaszín",
      value: "PINK",
    },
    {
      label: "Sárga",
      value: "YELLOW",
    },
    {
      label: "Világos kék",
      value: "LIGHT_BLUE",
    },
    {
      label: "Szürke",
      value: "GREY",
    },
    {
      label: "Lila",
      value: "PURPLE",
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Felhasználó adatok
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Jelenlegi név
                  </Typography>
                  <TextField size="small" disabled value={user.name} />
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
                  <TextField
                    size="small"
                    type="email"
                    disabled
                    value={user.email}
                  />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Új email cím
                  </Typography>
                  <TextField
                    type="email"
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
                    type="email"
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
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Írd be a jelenlegi jelszavad
                  </Typography>
                  <TextField
                    type="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Írd be az új jelszavad
                  </Typography>
                  <TextField
                    type="password"
                    size="small"
                    disabled={isLoading}
                    value={newPassword}
                    onChange={(e) => setPasswordNew(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Typography variant="caption" sx={{ fontSize: "14px " }}>
                    Írd be az új jelszavad újra
                  </Typography>
                  <TextField
                    type="password"
                    size="small"
                    disabled={isLoading}
                    value={newPasswordAgain}
                    onChange={(e) => setPasswordNewAgain(e.target.value)}
                  />
                </Stack>
                <Button
                  variant="contained"
                  disabled={isLoading || newPassword !== newPasswordAgain}
                  onClick={() =>
                    mutate({
                      currentPassword: password,
                      password: newPassword,
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
              <Grid container spacing={2} justifyContent={"center"}>
                {options.map((option, index) => (
                  <Grid width={120} key={`palette-${index}`}>
                    <ThemeProvider
                      theme={createTheme({
                        palette: {
                          primary: palettes[option.value],
                        },
                      })}
                    >
                      <Tooltip title={option.label}>
                        <Button
                          sx={{ height: "48px", borderRadius: "8px" }}
                          disabled={isLoading}
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            mutate({
                              paletteMode: option.value,
                            })
                          }
                        ></Button>
                      </Tooltip>
                    </ThemeProvider>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuthentication(SettingsPage);
