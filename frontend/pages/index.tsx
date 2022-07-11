import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Nav from "../components/Navigation";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-black w-full">
      <Nav />

      <div className="h-screen flex place-items-center justify-center  text-center">
        <h1 className="text-4xl text-blue-200">hello</h1>
      </div>
    </div>
  );
};

export default Home;
