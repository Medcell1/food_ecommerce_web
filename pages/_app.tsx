// pages/_app.tsx
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/components/customtextfield.css';
import '@/pages/signup/index.css';
import '@/pages/login/index.css';
import '@/components/sidebar.css';
import '@/components/navbar.css';
import "@/pages/dashboard/index.css"




import { UserContextProvider } from '@/context/usercontext';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <UserContextProvider>
      
      <Component {...pageProps} />
    </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
