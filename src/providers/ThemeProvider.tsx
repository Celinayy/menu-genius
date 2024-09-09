import { trpc } from "@/trpc/client";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  NoSsr,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren, useMemo } from "react";

export type ThemeProviderProps = PropsWithChildren;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { data: user } = trpc.user.find.useQuery();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: user?.darkMode ? "dark" : "light",
          primary: {
            main: "#322529",
          },
        },
        components: {
          MuiTextField: {
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
