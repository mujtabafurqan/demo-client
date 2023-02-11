import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image"

export default function IndexPage() {
  const router = useRouter();
  const { data: session } = useSession()
  useEffect(()=>{
    
      if (!session) {
        console.log("session = true")
        router.push('/auth/signin')
      }
    //   else{
    //     // maybe go to login page
    //     router.push('/login')
    // }
  //  }
  },[router,session])
  if(!session){
    return <div>loading...</div>
  }
  return (
    <Layout>
    </Layout>
  )
}