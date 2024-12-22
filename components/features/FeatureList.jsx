import React from "react";
import { Target, Upload, Eye, Globe, Shield } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function FeatureList() {
  const features = [
    {
      icon: Target,
      title: "Tailored for AI Responses",
      description:
        "Design JSON schemas to structure AI-generated outputs exactly how you need.",
    },
    {
      icon: Upload,
      title: "Extract from Files",
      description: "Upload reference files to auto-generate schema structures.",
    },
    {
      icon: Eye,
      title: "Real-Time Schema Preview",
      description: "Visualize your schema structure as you build it.",
    },
    {
      icon: Globe,
      title: "Flexible Exports",
      description: "Export in JSON, YAML, or Markdown for easy integration.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "No data is stored or sent to any server—everything stays local.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}
