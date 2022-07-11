import React, {useState} from "react";
import Nav from "../components/Navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { userData, errorMessage, userLoginData , loginError} from "../Types/types";
import Link from "next/link";
import { useRouter } from "next/router.js";
import { setCookie } from 'cookies-next';



const login: React.FC<> = () => {



  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginData>();


  const onSubmit: SubmitHandler<userLoginData> = (data) => {
     sendData(data);
  };

  const [error, setError] = useState<loginError>({
    message: ""
  });

  const sendData = async (data: userLoginData) => {
    try {
      const req = await fetch("http://localhost:8000/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req;

      let resultat = await res.json();

      console.log(resultat)

      if (res.status === 201) {
        if (resultat != undefined) {
        const value = resultat.token
        setCookie('colbr', value)
        router.push("/userpage");
        }
      } else {
        if (resultat !== undefined) {
          console.log(resultat);
          setError({
            message: resultat.message
          }); 
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Nav />
      <div className="flex text-white place-items-center min-h-screen bg-black">
        <div className=" w-5/6 sm:w-1/4 flex flex-col  mx-auto min-h-[500px]">
          <div className="border-b-2 border-gray-600 pb-4 flex flex-col items-center">
            <h1 className="text-2xl  pb-4 md:text-4xl">Se connecter</h1>
            <p>Suivez vos investissements en temps réel.</p>
          </div>

          {error.message? (
                <span className="text-red-800">{error.message}</span>
              ) : (
                <></>
              )}

          <div className="flex-1 flex flex-col justify-evenly items-center">
            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="email">
                Email:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                placeholder="vous@exemple.fr"
                type="text"
                {...register("email", { required: true })}
              />
               {errors.email && (
                <span className="text-red-800">Votre email est requis</span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="password">
                Password:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                type="text"
                placeholder="******"
                {...register("password", { required: true })}
              />
                   {errors.password && (
                <span className="text-red-800">
                  Veuillez renseigner votre mot de passe
                </span>
              )}
            </div>

            <div className="flex items-start w-full">
              <button className="bg-blue-800 rounded-xl p-2 ">Connexion</button>
            </div>

            <div className="flex w-full text-center "><p>Pas Encore Inscrit? <Link  href={'/register'}><span className="text-blue-800 cursor-pointer " >Inscrivez-vous Maintenant.</span></Link></p></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default login;
