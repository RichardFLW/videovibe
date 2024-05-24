"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  push,
  ref,
  set,
  get,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../../firebase.config";
import Link from "next/link";
import Modal from "react-modal";
import { useAuth } from "../../contexts/AuthContext";

interface SignupFormInputs {
  pseudo: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

const validationSchema = Yup.object().shape({
  pseudo: Yup.string()
    .min(4, "Le pseudo doit comporter au moins 4 caractères")
    .required("Le pseudo est requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est requise"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Le genre est requis")
    .required("Le genre est requis"),
});

const SignupForm: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuth();

  const handleAddData: SubmitHandler<SignupFormInputs> = async (data) => {
    console.log("handleAddData called with data: ", data);
    const auth = getAuth();
    try {
      const usersRef = ref(database, "users");
      const pseudoQuery = query(
        usersRef,
        orderByChild("pseudo"),
        equalTo(data.pseudo)
      );
      const snapshot = await get(pseudoQuery);

      if (snapshot.exists()) {
        console.log("Pseudo already exists");
        setError("pseudo", {
          type: "manual",
          message: "Le pseudo est déjà pris",
        });
        return;
      }

      const newUserCredential = await createUserWithEmailAndPassword(auth, `${data.pseudo}@example.com`, data.password);
      const newUser = newUserCredential.user;

      const newDataRef = push(usersRef);
      await set(newDataRef, {
        pseudo: data.pseudo,
        email: newUser.email,
        gender: data.gender,
      });

      login(); // Met à jour le contexte d'authentification
      reset();
      setModalMessage("Votre compte a été créé avec succès !");
      setModalIsOpen(true); // Ouvrir la modal
    } catch (error) {
      console.log("Firebase Error", error);
      setModalMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      setModalIsOpen(true); // Ouvrir la modal
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inscription
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Connexion
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleAddData)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="pseudo" className="sr-only">
                Pseudo
              </label>
              <input
                id="pseudo"
                type="text"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Pseudo"
                {...register("pseudo")}
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
                id="password"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmer le mot de passe"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <label htmlFor="gender" className="sr-only">
                Genre
              </label>
              <select
                id="gender"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("gender")}
              >
                <option value="" disabled>
                  Choisir un genre
                </option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              S'inscrire
            </button>
          </div>
        </form>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Compte créé"
          className="fixed z-10 inset-0 overflow-y-auto"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Compte créé
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {modalMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModalIsOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignupForm;
