import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo et description */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-3xl font-bold text-indigo-500">
            VideoVibe
          </Link>
          <p className="text-gray-600 text-center md:text-left mt-2">
            Votre plateforme préférée pour partager et découvrir des vidéos.
          </p>
        </div>

        {/* Liens de navigation */}
        <div className="flex space-x-6">
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Confidentialité
          </Link>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.548 0 11.675-6.155 11.675-11.496 0-.175-.004-.349-.012-.521A8.18 8.18 0 0022 6.557a8.265 8.265 0 01-2.357.636A4.1 4.1 0 0021.449 4.8a8.229 8.229 0 01-2.605.978A4.086 4.086 0 0015.448 4a4.092 4.092 0 00-4.073 4.099c0 .321.036.632.105.932-3.393-.17-6.402-1.767-8.419-4.201a4.08 4.08 0 00-.554 2.06c0 1.422.73 2.676 1.842 3.412a4.087 4.087 0 01-1.853-.507v.05c0 1.988 1.42 3.643 3.303 4.018a4.1 4.1 0 01-1.85.07 4.091 4.091 0 003.824 2.829A8.209 8.209 0 012 18.409a11.616 11.616 0 006.29 1.831"></path>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82v-9.294H9.692V11.07h3.128V8.45c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.465.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.309h3.587l-.467 3.636h-3.12V24h6.116c.733 0 1.326-.593 1.326-1.326V1.326C24 .593 23.407 0 22.675 0"></path>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.741 0 8.333.014 7.052.072 5.771.13 4.701.295 3.798.574 2.9.852 2.11 1.241 1.319 2.032.528 2.822.139 3.613-.138 4.51c-.279.902-.444 1.972-.501 3.253C-.014 8.741 0 9.148 0 12.001c0 2.852-.014 3.259.071 4.54.057 1.281.222 2.351.501 3.253.277.898.667 1.688 1.458 2.478.79.79 1.58 1.18 2.478 1.458.902.279 1.972.444 3.253.501 1.281.057 1.688.071 4.54.071 2.852 0 3.259-.014 4.54-.071 1.281-.057 2.351-.222 3.253-.501.898-.277 1.688-.667 2.478-1.458.79-.79 1.18-1.58 1.458-2.478.279-.902.444-1.972.501-3.253.057-1.281.071-1.688.071-4.54 0-2.852-.014-3.259-.071-4.54-.057-1.281-.222-2.351-.501-3.253-.277-.898-.667-1.688-1.458-2.478C21.188 1.241 20.398.852 19.5.574c-.902-.279-1.972-.444-3.253-.501C15.259.014 14.852 0 12 0zm0 5.838a6.162 6.162 0 016.162 6.163A6.162 6.162 0 0112 18.163 6.162 6.162 0 015.838 12 6.162 6.162 0 0112 5.838zm0 1.501a4.663 4.663 0 00-4.662 4.662 4.663 4.663 0 004.662 4.662 4.663 4.663 0 004.662-4.662A4.663 4.663 0 0012 7.339zM18.406 2.745a1.44 1.44 0 100 2.882 1.44 1.44 0 000-2.882z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
