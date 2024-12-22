import React from "react";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="text-center md:text-left">
              <p className="text-gray-600 font-semibold text-base">
                JSON Struct
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Made for developers, by developers
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Questions or feedback? Open an issue on GitHub.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Yathish84/json-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Github size={18} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
