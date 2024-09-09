import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  NoSsr,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";

export type ThemeProviderProps = PropsWithChildren;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = createTheme({
    palette: {
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
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <NoSsr>{children}</NoSsr>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};
