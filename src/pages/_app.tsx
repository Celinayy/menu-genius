import type { AppProps } from "next/app";
import { trpc } from "@/trpc/client";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
