import React,{useState} from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';




export function SchemaVisualizer({ fields }) {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = (path) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderField = (field, path) => {
    const isExpanded = expandedNodes.has(path);
    const hasChildren = field.type === 'object' || (field.type === 'array' && field.items?.type === 'object');

    return (
      <div key={path} className="ml-4">
        <div 
          className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50"
          onClick={() => hasChildren && toggleNode(path)}
        >
          {hasChildren && (
            <span className="text-gray-500">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          <span className="font-medium">{field.name}</span>
          <span className="text-sm text-gray-500">({field.type})</span>
          {field.required && <span className="text-xs text-red-500">required</span>}
          {field.description && (
            <span className="text-sm text-gray-500 italic">- {field.description}</span>
          )}
        </div>

        {isExpanded && field.type === 'object' && field.properties && (
          <div className="border-l-2 border-gray-200">
            {Object.values(field.properties).map((prop, index) => 
              renderField(prop, `${path}.${index}`)
            )}
          </div>
        )}

        {isExpanded && field.type === 'array' && field.items?.type === 'object' && field.items.properties && (
          <div className="border-l-2 border-gray-200">
            <div className="ml-4 text-sm text-gray-500">Array items:</div>
            {Object.values(field.items.properties).map((prop, index) => 
              renderField(prop, `${path}.items.${index}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Schema Preview</h3>
      <div className="border rounded-lg p-4">
        {fields.map((field, index) => renderField(field, `root.${index}`))}
        {fields.length === 0 && (
          <p className="text-gray-500 text-center py-4">No fields added yet</p>
        )}
      </div>
    </div>
  );
}