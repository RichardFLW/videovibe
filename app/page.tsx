"use client"

import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { database } from "./firebase.config";
import { ref as databaseRef, set } from "firebase/database";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners'; 
import showToast from '../app/utils/Toasts';



const HomePage = () => {
  const { isLogged, currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !description || !currentUser) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Video = reader.result as string;
        const videoId = uuidv4();

        const videoReference = databaseRef(database, `videos/${currentUser.uid}/${videoId}`);
        await set(videoReference, {
          title,
          description,
          video: base64Video,
          createdAt: new Date().toISOString(),
        });

        showToast("votre vidéo à bien été reçue !");

        // Réinitialiser les champs
        setTitle("");
        setDescription("");
        setFile(null);
        setIsUploading(false);
      };
    } catch (error) {
      console.error("Erreur lors de l'upload : ", error);
      setIsUploading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Section de gauche - Flux d'actualité */}
      <div className="w-full md:w-3/4 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Flux d&apos;actualité</h2>
        {/* Placeholder pour les actualités */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <p>Contenu de l&apos;actualité...</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Contenu de l&apos;actualité...</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Contenu de l&apos;actualité...</p>
          </div>
        </div>
      </div>

      {/* Section de droite */}
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md">
      {isLogged ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Téléverser une vidéo</h2>
            <form className="space-y-4" onSubmit={handleUpload}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Fichier vidéo
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="video/*"
                  required
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isUploading ? (
            <ClipLoader 
              color={'#fff'} 
              size={20} 
            />
          ) : (
            <>Téléverser</>
          )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">
              Pour publier une vidéo, veuillez vous connecter.
            </h2>
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
