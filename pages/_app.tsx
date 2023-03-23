import "~/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { clsx } from "clsx";

import { font } from "~/styles/font";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme={"system"}
      attribute="class"
      themes={["system", "light", "dark"]}
      storageKey={"fraccionar.theme"}
    >
      <Wrap>
        <Component {...pageProps} />
      </Wrap>
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
