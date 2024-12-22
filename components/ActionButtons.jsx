import React from "react";
import { PlusCircle, Wand2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { canGeneratePrompt } from "../utils/validation";
import { Button } from "./ui/button";

export function ActionButtons({ fields, onAddField, onGeneratePrompt }) {
  const canGenerate = canGeneratePrompt(fields);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onAddField}
        className="flex-1 transition-colors"
        variant="secondary"
      >
        <PlusCircle size={18} />
        Add New Field
      </Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onGeneratePrompt}
              disabled={!canGenerate}
              className="flex-1 bg-blue-600 rounded-md hover:bg-blue-500"
            >
              <Wand2 size={18} />
              Generate Prompt
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {!canGenerate
                ? "All fields must be filled out properly before generating a prompt"
                : "Generate an AI prompt based on your schema"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
