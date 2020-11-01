import '../styles/globals.css'
import '../styles/tailwind.css'
import 'fontsource-roboto';
import React from "react";
import {AppProps} from "next/app";
import Head from "next/head";
import {cartReducer} from "../store";
import { Provider } from 'react-redux'
import {ThemeProvider} from "@material-ui/styles";
import theme from "../theme";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Я поглажу?</title>
                <meta name="theme-color" content="#FFFFFF"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Provider store={cartReducer}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
