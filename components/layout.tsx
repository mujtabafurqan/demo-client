import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import styles from "../styles/index.module.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.fullPage}>
      <Header show/>
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
