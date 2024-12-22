"use client";
import React, { useState, useEffect } from "react";
import { FieldEditor } from "./FieldEditor";
import { ActionButtons } from "./ActionButtons";
import { SchemaVisualizer } from "./SchemaVisualizer";
import { ExportPanel } from "./ExportPanel";
import { ValidationErrors } from "./ValidationErrors";
import { validateSchema } from "../utils/schemaValidator";
import { generatePrompt } from "../utils/promptGenerator";
import { Wand2, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function SchemaBuilder() {
  const [fields, setFields] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
 const [activeTab, setActiveTab] = useState("editor");
  useEffect(() => {
    setValidationErrors(validateSchema(fields));
  }, [fields]);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        name: "",
        type: "string",
        description: "",
        required: false,
      },
    ]);
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (index, field) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...field } : f))
    );
  };

  const handleGeneratePrompt = () => {
    if (validationErrors.length > 0) {
      alert("Please fix validation errors before generating the prompt.");
      return;
    }
    const prompt = generatePrompt(fields);
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied to clipboard!");
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
           
            <h2 class="section-title">Start Building Your JSON Schema</h2>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <ValidationErrors errors={validationErrors} />

        {/* Mobile Tabs */}
        <div className="md:hidden mb-4">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <Button
              onClick={() => setActiveTab("editor")}
              variant={activeTab === "editor" ? "" : "secondary"}
            >
              Editor
            </Button>
            <Button
              onClick={() => setActiveTab("preview")}
              variant={activeTab === "preview" ? "" : "secondary"}
            >
              Preview
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div
            className={`space-y-4 ${
              activeTab === "editor" ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Schema Editor
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Define your schema structure below
                </p>
              </div>
              <div className="p-4 space-y-4">
                {fields.map((field, index) => (
                  <FieldEditor
                    key={index}
                    field={field}
                    onUpdate={(updates) => updateField(index, updates)}
                    onRemove={() => removeField(index)}
                  />
                ))}
                <ActionButtons
                  fields={fields}
                  onAddField={addField}
                  onGeneratePrompt={handleGeneratePrompt}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`space-y-4 ${
              activeTab === "preview" ? "block" : "hidden md:block"
            }`}
          >
            <SchemaVisualizer fields={fields} />
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4">Export Options</h3>
              <ExportPanel fields={fields} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
