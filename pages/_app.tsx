import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import Layout from '../components/Layout'
import { ApiSlice } from '../redux/Api/Api'

export interface PageProps {
  session?: Session
}
export default function App({Component,  pageProps  }: AppProps<PageProps>) {
  return (
    <SessionProvider session={pageProps.session }>
      <Layout>
      <ApiProvider api={ApiSlice}>
      <Component {...pageProps} />
      </ApiProvider>
      </Layout>
    </SessionProvider>
  )
}
