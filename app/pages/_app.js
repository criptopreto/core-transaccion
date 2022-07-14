import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import fetchJson from "../lib/fetchJson";
import { SWRConfig } from "swr";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Provider store={store}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/assets/icons/icon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/assets/icons/icon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          ></meta>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <NextNProgress />
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
