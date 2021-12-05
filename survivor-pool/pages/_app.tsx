import { createGlobalStyle, ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    background: #F5F4F0;
    display: block;
    height: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 0;
  }

  body {
    background-color: #FAFAFA;
    min-height: 100vh;
    padding: 1rem;
    margin-top: 0;
  }
`;

const theme = {
  colors: {
    primary: "#FAFAFA",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
