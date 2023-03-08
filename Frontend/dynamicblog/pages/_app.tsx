import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (router.pathname === '/login' || router.pathname === '/register') {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
