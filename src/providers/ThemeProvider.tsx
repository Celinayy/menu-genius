import { trpc } from "@/trpc/client";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  NoSsr,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren, useMemo } from "react";
import color from "color";
import {
  lightBlue,
  green,
  grey,
  pink,
  yellow,
  purple,
  brown,
  blue,
} from "@mui/material/colors";

export type ThemeProviderProps = PropsWithChildren;

export const palettes = {
  PINK: { main: pink[600] },
  DARK_BROWN: { main: "#6b3a20" },
  DARK_BLUE: { main: blue[900] },
  LIGHT_BLUE: { main: lightBlue[800] },
  PURPLE: { main: purple[600] },
  YELLOW: { main: yellow[600] },
  GREEN: { main: green[900] },
  GREY: { main: grey[800] },
};
export const secondaryPalettes = {
  PINK: { main: pink[300] },
  DARK_BROWN: { main: "#a74b1c" },
  DARK_BLUE: { main: blue[500] },
  LIGHT_BLUE: { main: lightBlue[600] },
  PURPLE: { main: purple[300] },
  YELLOW: { main: yellow[200] },
  GREEN: { main: green[600] },
  GREY: { main: grey[600] },
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { data: user } = trpc.user.find.useQuery();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: user?.darkMode ? "dark" : "light",
          primary: palettes[user?.paletteMode ?? "DARK_BROWN"],
          secondary: secondaryPalettes[user?.paletteMode ?? "DARK_BROWN"],
        },
        components: {
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
          },
          MuiCard: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: color(theme.palette.background.paper)
                  .alpha(0.85)
                  .toString(),
              }),
            },
          },
          MuiChip: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: color(theme.palette.background.paper)
                  .alpha(1)
                  .toString(),
              }),
            },
            defaultProps: {
              variant: "outlined",
            },
          },
        },
      }),
    [user?.darkMode, user?.paletteMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <NoSsr>{children}</NoSsr>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};
