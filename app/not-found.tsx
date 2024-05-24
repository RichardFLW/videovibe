"use client"
import React from "react";
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
  Oups! On dirait que cette page n&apos;existe pas.
</h2>

<p className="text-lg text-gray-600 mb-8">
  Peut-être avez-vous suivi un mauvais lien ou la page a été déplacée. Ne
  vous inquiétez pas, cela arrive aux meilleurs d&apos;entre nous.
</p>

<p className="text-lg text-gray-600 mb-8">
  On ne trouve pas la page... comme on ne trouve jamais le dernier
  chaussette propre.
</p>
      <Link
        href="/"
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Custom404;
