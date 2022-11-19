import Head from "next/head";
import { useState } from "react";
import { LoginCard } from "../components/LoginCard";


export default function Auth () {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    return (
      <div >
        <Head>
          <title>Ai friend chat</title>
          <meta name="description" content="Chat with your Ai friend" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className="bg-[#42464D]  w-screen h-screen ">
        <LoginCard setIsSignUp={setIsSignUp} setShowModal={setShowModal} isSignUp={isSignUp}/>
        </div>
   
      </div>
    )
  }



