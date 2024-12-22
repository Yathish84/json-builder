import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FieldTypeSelector } from './fields/FieldTypeSelector';
import { FieldDescription } from './fields/FieldDescription';
import { RequiredCheckbox } from './fields/RequiredCheckbox';
import { Input } from './ui/input';
import { Button } from './ui/button';



export function ObjectConfigEditor({ properties, onUpdate, level = 0 }) {
  const addProperty = () => {
    const newProperty = {
      name: '',
      type: 'string',
      description: '',
      required: false
    };
    onUpdate({ ...properties, [Date.now().toString()]: newProperty });
  };

  const updateProperty = (key, updates) => {
    const currentProperty = properties[key];
    const newProperty = { ...currentProperty, ...updates };

    // Handle type changes
    if (updates.type) {
      if (updates.type === 'object') {
        newProperty.properties = {};
        delete newProperty.items;
      } else if (updates.type === 'array') {
        newProperty.items = {
          type: 'string',
          name: 'item',
          description: '',
          required: true
        };
        delete newProperty.properties;
      } else {
        delete newProperty.properties;
        delete newProperty.items;
      }
    }

    onUpdate({
      ...properties,
      [key]: newProperty
    });
  };

  const removeProperty = (key) => {
    const { [key]: _, ...rest } = properties;
    onUpdate(rest);
  };

  // Limit nesting depth to prevent infinite recursion
  const maxLevel = 5;
  const canAddNested = level < maxLevel;

  return (
    <div
      className={`${
        level > 0 ? "ml-4 mt-2 p-4 border-l-2 border-green-200" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">
          {level === 0 ? "Object Properties" : "Nested Properties"}
        </h4>
        <Button
          onClick={addProperty}
          variant={"ghost"}
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 hover:bg-transparent"
        >
          <Plus size={16} />
          Add Property
        </Button>
      </div>
      <div className="space-y-4">
        {Object.entries(properties).map(([key, prop]) => (
          <div key={key} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="Property Name"
                className="w-full p-2 border rounded"
                value={prop.name}
                onChange={(e) => updateProperty(key, { name: e.target.value })}
              />
              <FieldTypeSelector
                value={prop.type}
                onChange={(type) => updateProperty(key, { type })}
              />
              <FieldDescription
                value={prop.description}
                onChange={(description) => updateProperty(key, { description })}
              />
              <RequiredCheckbox
                checked={prop.required}
                onChange={(required) => updateProperty(key, { required })}
              />

              {canAddNested && prop.type === "object" && (
                <ObjectConfigEditor
                  properties={prop.properties || {}}
                  onUpdate={(properties) => updateProperty(key, { properties })}
                  level={level + 1}
                />
              )}

              {canAddNested && prop.type === "array" && (
                <div className="ml-4 mt-2 p-4 border-l-2 border-blue-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Array Items Configuration
                  </h4>
                  <div className="space-y-2">
                    <FieldTypeSelector
                      value={prop.items?.type || "string"}
                      onChange={(type) => {
                        const newItems = {
                          type,
                          name: "item",
                          description: "",
                          required: true,
                          properties: type === "object" ? {} : undefined,
                        };
                        updateProperty(key, { items: newItems });
                      }}
                    />
                    {prop.items?.type === "object" && (
                      <ObjectConfigEditor
                        properties={prop.items.properties || {}}
                        onUpdate={(properties) =>
                          updateProperty(key, {
                            items: { ...prop.items, properties },
                          })
                        }
                        level={level + 1}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button
              onClick={() => removeProperty(key)}
              variant="icon"
              className="p-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}