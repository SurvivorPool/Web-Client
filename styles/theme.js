import { createGlobalStyle } from "styled-components";

import palette from "./palette";
import animations from "./animations";
import breakpoints from "./breakpoints";
import layout from "./layout";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Happy-Fox;
        src: url('../assets/font/HappyFox-Condensed.otf');
    }
    
    @font-face {
        font-family: Raleway;
        src: url('../assets/font/Raleway-Regular.ttf');
    }
`;

const theme = {
  animations,
  breakpoints,
  layout,
  palette,
};

export default theme;
