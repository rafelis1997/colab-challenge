import { ReactNode } from "react";
import { Header } from "./header";
import { Inter } from 'next/font/google'
import Head from "next/head";

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
        {children}
      </main>
    </>
  )
}