import React, { useState } from "react";
import Nav from "../components/Navigation.jsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { userData, errorMessage } from "../Types/types";
import { useRouter } from "next/router.js";

const register: React.FC<> = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();
  const onSubmit: SubmitHandler<userData> = (data) => {
    sendData(data);
  };

  const [error, setError] = useState<errorMessage>({
    emailError: "",
    passwordError: "",
  });

  const sendData = async (data: userData) => {
    try {
      const req = await fetch("http://localhost:8000/api/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req;

      let resultat = await res.json();

      if (res.status === 201) {
        if (resultat != undefined) {
          console.log(resultat);
          router.push("/login");
        }
      } else {
        if (resultat !== undefined) {
          console.log(resultat);
          setError({
            emailError: resultat.errors.email,
            passwordError: resultat.errors.password,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Nav />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex text-white place-items-center min-h-screen bg-black"
      >
        <div className="pb-10 w-5/6 sm:w-1/4 flex flex-col  mx-auto min-h-[650px]">
          <div className="border-b-2 border-gray-600 pb-2 mb-2 flex flex-col items-center">
            <h1 className="text-2xl  pb-4 md:text-4xl">Se connecter</h1>
            <p>Suivez vos investissements en temps réel.</p>
          </div>

          <div className="flex-1 flex flex-col justify-evenly items-center">
            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="email">
                Nom:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                type="text"
                {...register("nom", { required: true })}
              />
              {errors.nom && (
                <span className="text-red-800">Votre nom est requis</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="email">
                Prenom:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                type="string"
                {...register("prenom", { required: true })}
              />
              {errors.prenom && (
                <span className="text-red-800">Votre prenom est requis</span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="email">
                Email:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                placeholder="vous@exemple.fr"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-800">Votre email est requis</span>
              )}

              {error.emailError ? (
                <span className="text-red-800">{error.emailError}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="password">
                Mot de passe:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                type="text"
                placeholder="******"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-800">
                  Veuillez renseigner un mot de passe de votre choix
                </span>
              )}

              {error.passwordError ? (
                <span className="text-red-800">{error.passwordError}</span>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="pb-2" htmlFor="password">
                Confirmer le mot de passe:
              </label>
              <input
                className=" p-1 text-border-gray-600 bg-black border-2 border-white rounded-xl"
                type="text"
                placeholder="******"
                {...register("password_confirmation", { required: true })}
              />
              {errors.password_confirmation && (
                <span className="text-red-800">
                  Veuillez renseigner le meme mot de passe
                </span>
              )}
            </div>

            <div className="flex items-start w-full">
              <button className="bg-blue-800 rounded-xl p-2  hover:bg-white hover:text-blue-800">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default register;
