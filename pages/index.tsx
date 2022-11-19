import Head from "next/head";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleLogout = useCallback(() => {
    signOut();
  }, []);


  const { status } = useSession();
  const authenticated= status==="authenticated"

  return (
    <div>
      <Head>
        <title>Ai friend chat</title>
        <meta name="description" content="Chat with your Ai friend" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-[#42464D]  w-screen h-screen bg-[url('/buddies.svg')] bg-no-repeat mt-12 overflow-y-scroll overflow-x-hidden bg-contain md:bg-auto flex md:flex-row flex-col snap-mandatory snap-y snap-start">
        <section className="md:w-[50%] h-[50%] w-full"></section>
        <section className="md:w-[50%] h-[50%] w-full flex flex-col justify-start sm:justify-center ">
          <div>
            <p className="text-2xl text-sky-400 mx-5 ">
              Chat with Your Friendly, Clever and Creative Robot Buddy
            </p>

            <button
              className="py-3 px-8 bg-sky-400 rounded-full hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 hover:text-slate-100 mx-5 mt-7"
              onClick={authenticated? () => {
                handleLogout()
              }: () => {
                router.push("/auth");
              }}
            >
        {  authenticated? <p >Logout</p> :  <p>Sign In</p>}
            </button>
          </div>
        </section>
      </div>
      <div className="bg-[#42464D]  w-screen h-screen  mt-0 overflow-y-scroll overflow-x-hidden bg-contain  flex md:flex-row flex-col snap-mandatory snap-y snap-start ">
        <section className="md:w-[50%] h-[50%] md:h-[70%] w-full relative md:mt-28">
          <Image src="/chatroom.png" alt="chatrom" fill className="md:ml-5" />
        </section>
        <section className="md:w-[50%] h-[50%] w-full flex flex-col justify-center px-2 ">
          <p className="text-2xl text-sky-400 mx-5 text-center">
            Tell or Ask Her Anything!
          </p>
          <div className="wrapper">
          <ul className="text-center text-slate-100 dynamic">
            <li><span>I am so happy today. I got a new job yeeh!! </span></li>
            <li><span>Who won the US Senate midterm elections? </span></li>
            <li><span>Suggest me tourist attraction in South Africa? </span></li>
            <li><span> Encourage me to overcome procrastination. </span></li>
          </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
