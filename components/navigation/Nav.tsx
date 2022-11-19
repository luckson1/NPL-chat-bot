import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { TfiHome } from "react-icons/tfi";
export const Nav = () => {
  const router = useRouter()
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleLogout = useCallback(() => {
    signOut();
  }, []);


  const { status } = useSession();
  const authenticated= status==="authenticated"

  return (
    <nav className="fixed w-screen bg-[#1B2430] z-30 top-0  dark:text-slate-10 mx-0 flex flex-row justify-between h-12">
      <div className="flex flex-row w-[30%]">
        <TfiHome
        onClick={()=> router.push("/")} 
        size={"25px"} className="ml-5 my-2 text-sky-400 focus:outline-none focus:shadow-outline transform transition hover:scale-150 cursor-pointer duration-300 ease-in-out" />
      </div>
      <div className="w-full  flex flex-row flex-wrap items-center justify-end mt-0 py-2 bg-[#1B2430] mr-12">
    
        <div
          className={`w-full flex-row md:gap-20 md:flex md:items-center md:w-auto ${
            isOpenMenu ? "" : "hidden"
          } mt-2 md:mt-0 bg-[#1B2430]   text-black p-4 md:p-0 z-10" `}
        >
          <ul className=" md:flex  flex-1 items-center ">
            <li className=" mr-96 md:mr-3  ">
              <Link
                href={"/Chatroom"}
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="inline-block  py-2 px-4 text-sky-300 font-bold no-underline hover:underline  hover:-translate-y-1 hover:scale-125 transform cursor-pointer"
              >
                Chatroom
              </Link>
            </li>
          </ul>

          <button className="py-1 px-5 bg-sky-400 rounded-lg hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 hover:text-slate-100"
             onClick={authenticated? ()=> {handleLogout();setIsOpenMenu(!isOpenMenu)}: ()=> {router.push("/auth");setIsOpenMenu(!isOpenMenu)}} > {authenticated? "Logout": "Login"}</button>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            id="nav-toggle"
            className="flex items-center p-1 text-white hover:text-sky-400 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            {isOpenMenu ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>
      <hr className="border-b opacity-25 my-0 py-0" />
    </nav>
  );
};
