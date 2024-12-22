"use client"
import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { ArrayConfigEditor } from './ArrayConfigEditor';
import { ObjectConfigEditor } from './ObjectConfigEditor';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from './ui/input';
import { RequiredCheckbox } from './fields/RequiredCheckbox';

import { FieldTypeSelector } from './fields/FieldTypeSelector';
import { FieldDescription } from './fields/FieldDescription';
import { Button } from './ui/button';


export function FieldEditor({ field, onUpdate, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasNestedFields = field.type === 'array' || field.type === 'object';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {hasNestedFields && (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0"
                variant="icon"
              >
                {isExpanded ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </Button>
            )}
            <h3 className="text-lg font-medium text-gray-900">
              Field Configuration
            </h3>
          </div>
          <Button
            onClick={onRemove}
            variant="icon"
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove field"
          >
            <Trash2 size={18} />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Name
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1 text-gray-400 hover:text-gray-600 cursor-help">
                      ?
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a unique identifier for this field</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="text"
              placeholder="e.g., userName"
            //   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={field.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1 text-gray-400 hover:text-gray-600 cursor-help">
                      ?
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the data type for this field</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>

            <FieldTypeSelector
              value={field.type}
              onChange={(value) =>
                onUpdate({
                  type: value,
                  items:
                    value === "array"
                      ? {
                          type: "string",
                          name: "item",
                          description: "",
                          required: true,
                        }
                      : undefined,
                  properties: value === "object" ? {} : undefined,
                })
              }
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 text-gray-400 hover:text-gray-600 cursor-help">
                    ?
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe what this field represents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <FieldDescription
            value={field.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
         
        </div>

        <div className="mt-4">
          <RequiredCheckbox
            checked={field.required}
            onChange={(e) => onUpdate({ required: !field.required })}
          />
        </div>

        {isExpanded && (
          <>
            {field.type === "array" && (
              <ArrayConfigEditor
                items={field.items}
                onUpdate={(items) => onUpdate({ items })}
              />
            )}

            {field.type === "object" && (
              <ObjectConfigEditor
                properties={field.properties || {}}
                onUpdate={(properties) => onUpdate({ properties })}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}