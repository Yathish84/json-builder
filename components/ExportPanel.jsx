import React from 'react';
import { Download } from 'lucide-react';
import { exportToJSON, exportToYAML, exportToMarkdown } from '../utils/exporters';
import { Button } from './ui/button';


export function ExportPanel({ fields }) {
  const exportFormats = [
    { label: 'JSON', fn: exportToJSON },
    { label: 'YAML', fn: exportToYAML },
    { label: 'Markdown', fn: exportToMarkdown }
  ];

  const handleExport = (format, exportFn) => {
    const content = exportFn(fields);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4">
      {exportFormats.map(({ label, fn }) => (
        <Button
        //   className="flex-1"
          key={label}
        //   variant="secondary"
          onClick={() => handleExport(label, fn)}
          className="flex-1 items-center gap-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500"
        >
          <Download size={16} />
          Export {label}
        </Button>
      ))}
    </div>
  );
}