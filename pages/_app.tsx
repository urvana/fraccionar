import "~/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme={"system"}
      attribute="class"
      themes={["system", "light", "dark"]}
      storageKey={"fraccionar.theme"}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
