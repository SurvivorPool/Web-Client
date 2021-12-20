import React from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

const schemeLight: ColorScheme = "light";
const schemeDark: ColorScheme = "dark";

export const Providers: React.FC = ({ children }) => {
  const [colorScheme, setColorScheme] =
    React.useState<ColorScheme>(schemeLight);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value || (colorScheme == schemeDark ? schemeLight : schemeDark)
    );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          colors: {
            brand: [
              "#FFF4E6",
              "#FEDFB9",
              "#FDCA8B",
              "#FDB65E",
              "#FCA131",
              "#FB8D04",
              "#C97103",
              "#975402",
              "#643802",
              "#321C01",
            ],
          },
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
export default Providers;
