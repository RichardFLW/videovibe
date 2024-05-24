"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../../firebase.config";
import * as Yup from "yup";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormInputs {
  pseudo: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  pseudo: Yup.string().required("Le pseudo est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    const auth = getAuth();
    try {
      // Rechercher l'utilisateur par pseudo
      const usersRef = ref(database, "users");
      const pseudoQuery = query(usersRef, orderByChild("pseudo"), equalTo(data.pseudo));
      const snapshot = await get(pseudoQuery);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userKey = Object.keys(users)[0];
        const userData = users[userKey];

        // Utiliser l'email de l'utilisateur pour se connecter
        await signInWithEmailAndPassword(auth, userData.email, data.password);
        login();
        window.location.href = "/";
      } else {
        setModalMessage("Pseudo non trouvé. Veuillez vérifier vos informations.");
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error("Erreur Firebase :", error);
      setModalMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      setModalIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Pas de compte ?{" "}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Inscription
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="pseudo" className="sr-only">
                Pseudo
              </label>
              <input
                {...register("pseudo")}
                id="pseudo"
                name="pseudo"
                type="text"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Pseudo"
              />
              {errors.pseudo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pseudo.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Se connecter"}
            </button>
          </div>
        </form>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>{modalMessage}</p>
              <button
                className="mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => setModalIsOpen(false)}
              >
                Fermer
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
