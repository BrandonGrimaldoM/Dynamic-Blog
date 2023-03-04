import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();



  // Comprueba si la ruta actual es la página de inicio de sesión (login)

  if (router.pathname === '/login' || router.pathname === '/register') {
    // Si es así, renderiza el componente sin el layout
    <Provider store={store}>
      return <Component {...pageProps} />
    </Provider>

  }

  // De lo contrario, renderiza el componente dentro del layout
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
