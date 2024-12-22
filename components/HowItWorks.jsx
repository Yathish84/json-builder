import React from "react";
import { Plus, Settings, Eye, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: "Add New Field",
      description: "Click 'Add New Field' to start defining your schema.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Configure",
      description:
        "Configure the field name, type, description, and dependencies.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Preview",
      description: "View your schema in real-time in the Schema Preview panel.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export",
      description:
        "Export your schema in your preferred format or copy the generated prompt.",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-6 pb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              {step.icon}
            </div>
            <h3 className="font-medium text-gray-800 mb-2">
              Step {index + 1}: {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
