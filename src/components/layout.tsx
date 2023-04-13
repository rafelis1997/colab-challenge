import { ReactNode } from "react";
import { Header } from "./header";
import { Inter } from 'next/font/google'
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: ReactNode
}

export function RootLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Head>
        <title>Colab User Challenge</title>
      </Head>
      <main className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
        {children}
      </main>
    </>
  )
}