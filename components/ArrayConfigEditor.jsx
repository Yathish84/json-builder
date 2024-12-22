import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ObjectConfigEditor } from './ObjectConfigEditor';
import { FieldTypeSelector } from './fields/FieldTypeSelector';



export function ArrayConfigEditor({ items, onUpdate }) {
  const defaultItems = {
    type: 'string',
    name: 'item',
    description: '',
    required: true
  };

  const handleTypeChange = (type) => {
    const newItems = {
      ...defaultItems,
      type,
      properties: type === 'object' ? {} : undefined
    };
    onUpdate(newItems);
  };

  return (
    <div className="ml-4 mt-2 p-4 border-l-2 border-blue-200">
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Array Items Configuration
      </h4>
      <div className="space-y-2">
        <FieldTypeSelector
          value={items?.type || "string"}
          onChange={(value) => handleTypeChange(value)}
        />
        {/* <select
          className="w-full p-2 border rounded"
          value={items?.type || "string"}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="string">Array of Strings</option>
          <option value="number">Array of Numbers</option>
          <option value="boolean">Array of Booleans</option>
          <option value="object">Array of Objects</option>
        </select> */}

        {items?.type === "object" && (
          <ObjectConfigEditor
            properties={items.properties || {}}
            onUpdate={(properties) => onUpdate({ ...items, properties })}
          />
        )}
      </div>
    </div>
  );
}