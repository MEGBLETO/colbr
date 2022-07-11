import React from "react";
import { GetServerSideProps } from "next";
import requireAuth from "../HOC/requireAuth";
import Image from "next/image";
import welcome from "../img/welcome.gif";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router.js";


import Nav from "../components/Navigation";

const userpage: React.FC<> = () => {
  const router = useRouter();

  const logout = () => {
    console.log("hello");
    deleteCookie("colbr");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <div className="flex  flex-col justify-center  h-screen place-items-center p-30">
        <h3 className=" pb-10">
          Bienvenue sur votre compte utillisateur colbr
        </h3>
        <Image src={welcome} width={200} height={200}></Image>
        <button
          onClick={() => logout()}
          className="m-5 p-2 bg-blue-800 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default userpage;

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
