import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  
  

  // Comprueba si la ruta actual es la página de inicio de sesión (login)
  
  if (router.pathname === '/login' || router.pathname === '/register') {
    // Si es así, renderiza el componente sin el layout
    return <Component {...pageProps} />
  }

  // De lo contrario, renderiza el componente dentro del layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
