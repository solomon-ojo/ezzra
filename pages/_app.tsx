import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
          <ToastContainer />
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
