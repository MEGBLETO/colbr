import React, { useState } from "react";
import Image from "next/image";
import { logo } from "../img/logo.svg";
import Link from "next/link";
import {BsPerson} from "react-icons/bs"

const Navigation = () => {
  const [hamburger, setHamburger] = useState(false);

  const afficherMenu = () => {
    setHamburger(!hamburger);
  };

  return (
    <div className="navbar w-full  justify-between min-h-[40px] sm:min-h-[20px] bg-black border-b-2 border-gray-600 sticky top-0 z-10">
      <div className="navbar-start">
        <a className="pl-5 cursor-pointer" href="/">
          <Image
            height={80}
            width={120}
            src="https://colbr.co/_next/static/media/logo-colbr.9f89fb3b.svg"
            alt=""
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <Link href="/login">
            <li>
              <a>Investir</a>
            </li>
          </Link>
          <Link href="/login">
            <li>
              <a>Advisory</a>
            </li>
          </Link>
          <Link href="/login">
            <li>
              <a>Devenir membre</a>
            </li>
          </Link>
          <Link href="/login">
            <li>
              <a>L'équipe</a>
            </li>
          </Link>
          <Link href="/login">
            <li>
             <BsPerson className="h-[100px] w-[50px]"/>
            </li>
          </Link>
         
        </ul>
      </div>

      <div className="dropdown">
        <label
          tabIndex="0"
          className="btn btn-ghost lg:hidden"
          onClick={() => afficherMenu()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
      {hamburger ? (
           <ul className="absolute left-0 right-0 bg-black h-screen top-[12vh] md:top-[10vh] w-full flex flex-col ">
            <div className="flex flex-col h-1/2 justify-between place-items-center p-10">
            <Link href="/">
             <li className="cursor-pointer">
               <a>Investir</a>
             </li>
           </Link>
           <Link  href="/">
             <li className="cursor-pointer">
               <a>Advisory</a>
             </li>
           </Link>
           <Link href="/">
             <li className="cursor-pointer">
               <a>Devenir membre</a>
             </li>
           </Link>
           <Link href="/">
             <li className="cursor-pointer">
               <a>L'équipe</a>
             </li>
           </Link>
           <Link href="/login">
             <li className="cursor-pointer"> 
              <BsPerson className="h-[100px] w-[50px]"/>
             </li>
           </Link>
            </div>
           
          
         </ul>
        ) : (
          <></>
        )}
    </div>
  );
};

export default Navigation;
