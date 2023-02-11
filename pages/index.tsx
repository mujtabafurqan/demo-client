import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/router";

import Image from "next/image"

export default function IndexPage() {
  const router = useRouter();
  const { data: session } = useSession()
  useEffect(()=>{
      console.log("session = ", session)
      if (!session) {
        router.push('/auth/signin')
      }
      else{
        // maybe go to login page
        router.push('/')
    }
  //  }
  },[])
  if(!session){
    return <div>loading...</div>
  }
  return (
    <Layout>
    </Layout>
  )
}