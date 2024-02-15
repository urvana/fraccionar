import "../styles/globals.css";

import { clsx } from "clsx";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import { font } from "~/styles/font";
import { ApolloProvider } from "@apollo/client";
import client from "../app/lib/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme={"system"}
      attribute="class"
      themes={["system", "light", "dark"]}
      storageKey={"fraccionar.theme"}
    >
      <ApolloProvider client={client}>
        <Wrap>
          <Component {...pageProps} />
        </Wrap>
      </ApolloProvider>
    </ThemeProvider>
  );
}

function Wrap({ className, style, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      style={style}
      className={clsx(
        "flex-1 flex flex-col",
        // "h-full min-h-full", // "h-full", // do not use here
        // "bg-gray-50",
        // "caret-gray-800 text-black",
        // "bg-gray-50 dark:bg-gray-900 print:bg-white",
        // "caret-gray-800 dark:caret-skin-400",
        // IS_PRODUCTION ? "" : "debug-screens",
        font.variable,
        "font-sans",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
