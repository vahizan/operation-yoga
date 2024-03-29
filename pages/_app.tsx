import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/calendar.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
