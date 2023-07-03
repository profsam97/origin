import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ContextProvider from "@/Store/ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  //this allows us to define our custom theme e.g. typography, variants e.t.c
  const customTheme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      fontWeightBold: 700,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
    },
      components: {
        MuiCircularProgress: {
            defaultProps: {
                size: "1.2rem"
            },
        },
    },
      
  });
  const client = new QueryClient()

  return (
      <QueryClientProvider client={client}>
          <ContextProvider>
      <ThemeProvider theme={customTheme} >
      <Component {...pageProps} />
      </ThemeProvider>
        <ReactQueryDevtools position={'bottom-right'} initialIsOpen={false} />
          </ContextProvider>
      </QueryClientProvider>
  )
}
