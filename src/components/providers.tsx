import React from "react";
import { MantineProvider } from "@mantine/core";

export const Providers: React.FC = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
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
  );
};
export default Providers;
