import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

import Image from "next/image"

export default function IndexPage() {

  // const { data: session, status } = useSession()
  // useEffect(()=>{
    
  //     if (session) {
  //       console.log("session = true")
  //       router.push('/blogs')
  //     }else{
  //       // maybe go to login page
  //       router.push('/login')
  //   }
  //  }
  // },[router,session])
  
  return (
    <Layout>
    </Layout>
  )
}