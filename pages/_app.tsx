import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ContextProvider from "@/Store/ContextProvider";
import React from "react";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  //this allows us to define our custom theme e.g. typography, component e.t.c
  const customTheme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      fontWeightBold: 700,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
    },
    // customized the size of the circular progress component to make it smaller
      components: {
        MuiCircularProgress: {
            defaultProps: {
                size: "1.2rem"
            },
        },
    },
      
  });
  const client = new QueryClient()
    //this displays a loading bar when routing
    React.useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();
        //add the event handler on mount
        Router.events.on("routeChangeStart", handleRouteStart);
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);
        return () => {
            // remove the event handler on unmount!
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, []);
  return (
      <ContextProvider>
      <QueryClientProvider client={client}>
      <ThemeProvider theme={customTheme} >
      <Component {...pageProps} />
      </ThemeProvider>
        <ReactQueryDevtools position={'bottom-right'} initialIsOpen={false} />
      </QueryClientProvider>
      </ContextProvider>
  )
}
