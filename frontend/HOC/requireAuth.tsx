import React, { useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";



const requireAuth = (gssp: GetServerSideProps) => {

  return async (ctx: GetServerSidePropsContext) => {
    let token =  "hi";

    try {
      const { req } = ctx;
      if (req.headers.cookie) {
        if (!token) {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
          };
        }
        else{
            return await gssp(ctx);
        }
      }
    } catch (error) {
        return {
            redirect: {
              permanent: false,
              destination: '/login',
            },
          };
    }
  };
};




export default requireAuth;
