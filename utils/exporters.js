import yaml from 'js-yaml';

export function exportToJSON(fields) {
  return JSON.stringify(fields, null, 2);
}

export function exportToYAML(fields) {
  return yaml.dump(fields);
}

export function exportToMarkdown(fields){
  function renderField(field, level = 0){
    const indent = '  '.repeat(level);
    let md = `${indent}- **${field.name}** (${field.type})${field.required ? ' *required*' : ''}\n`;
    md += `${indent}  ${field.description}\n`;

    if (field.type === 'object' && field.properties) {
      md += `${indent}  Properties:\n`;
      md += Object.values(field.properties)
        .map(prop => renderField(prop, level + 2))
        .join('\n');
    }

    if (field.type === 'array' && field.items?.type === 'object') {
      md += `${indent}  Array items:\n`;
      md += Object.values(field.items.properties || {})
        .map(prop => renderField(prop, level + 2))
        .join('\n');
    }

    return md;
  }

  return fields.map(field => renderField(field)).join('\n');
}