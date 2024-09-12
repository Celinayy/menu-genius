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

export type ThemeProviderProps = PropsWithChildren;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { data: user } = trpc.user.find.useQuery();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: user?.darkMode ? "dark" : "light",
          primary: {
            main: "#6b3a20",
          },
          secondary: {
            main: "#b45615",
          },
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
    [user?.darkMode]
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
