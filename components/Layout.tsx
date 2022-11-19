
import { Nav } from "./navigation/Nav";
 type AppProps= {
    children?: React.ReactNode
 }


export default function Layout({ children }:AppProps ) {
    return (
      <>
        <Nav/>
        <main>{children}</main>

      </>
    )
  }