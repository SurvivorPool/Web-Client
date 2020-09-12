import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../state/store";
import { ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";

import theme, { GlobalStyle } from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={useStore(pageProps.initialReduxState)}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
