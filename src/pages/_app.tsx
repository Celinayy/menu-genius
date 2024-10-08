import type { AppProps } from "next/app";
import { trpc } from "@/trpc/client";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

import "@/styles/global.css";
import HeaderComponent from "@/components/HeaderComponent";
import { Box, Stack } from "@mui/material";
import Waves from "@/components/Waves";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {" "}
        <HeaderComponent />
        <Stack padding={2}>
          <Box
            sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: -1 }}
          >
            <Waves />
          </Box>
          <Component {...pageProps} />
        </Stack>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(App);
