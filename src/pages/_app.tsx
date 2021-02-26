import "../styles/globals.css";
import "../styles/tailwind.css";
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import dynamic from "next/dynamic";
import theme from "../theme";
import { store } from "../store";

dynamic(() => import("abortcontroller-polyfill/dist/polyfill-patch-fetch"));

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Погладить можно?</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <React.StrictMode>
              <Provider store={store}>
                  <Component {...pageProps} />
              </Provider>
          </React.StrictMode>
      </ThemeProvider>
    </>
  );
}
