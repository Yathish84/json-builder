import React from "react";
import { FeatureList } from "./features/FeatureList";

export function Introduction() {
  return (
    <div className="space-y-8 mb-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome to JSON Struct!
        </h2>
        <p className="text-gray-600 mb-6">
          This tool is specifically designed to help you build JSON schemas that
          define the structure and format of responses expected from AI tools.
          Define fields manually to build your desired JSON schema.
        </p>
        {/* <FileUpload onSchemaLoad={onSchemaLoad} /> */}
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Key Features
        </h2>
        <FeatureList />
      </div>
    </div>
  );
}
