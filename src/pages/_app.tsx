import type { AppProps } from "next/app";
import { trpc } from "@/trpc/client";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default trpc.withTRPC(App);
