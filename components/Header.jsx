import React from "react";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">JSON Struct</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Design AI-Ready JSON Schemas
        </h2>
        <p className="text-base text-gray-600 max-w-3xl mx-auto">
          Build JSON structures tailored for AI tools. Generate schema prompts
          effortlessly—no data storage, no complexity.
        </p>
      </div>
    </header>
  );
}
