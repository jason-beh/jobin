import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60,
        keepAlive: 5 * 60,
      }}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
