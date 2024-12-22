

function generateFieldStructure(field, level = 0) {
  const maxLevel = 5;
  if (level >= maxLevel) {
    return `<${field.type}>`;
  }

  if (field.type === 'array') {
    if (field.items?.type === 'object') {
      return [generateObjectStructure(field.items.properties || {}, level + 1)];
    }
    return [`<${field.items?.type || 'string'}>`];
  }
  
  if (field.type === 'object') {
    return generateObjectStructure(field.properties || {}, level + 1);
  }
  
  return `<${field.type}>`;
}

function generateObjectStructure(
  properties , 
  level = 0
) {
  return Object.entries(properties).reduce((acc, [key, prop]) => ({
    ...acc,
    [prop.name || key]: generateFieldStructure(prop, level)
  }), {});
}

function generateFieldDescription(field, indent = '') {
  let desc = `${indent}- ${field.name} (${field.type}): ${field.description}`;
  
  if (field.type === 'array') {
    if (field.items?.type === 'object') {
      desc += '\n  Array items contain:';
      Object.values(field.items.properties || {}).forEach(prop => {
        desc += '\n' + generateFieldDescription(prop, indent + '    ');
      });
    } else {
      desc += ` (array of ${field.items?.type || 'string'})`;
    }
  } else if (field.type === 'object') {
    desc += '\n  Object properties:';
    Object.values(field.properties || {}).forEach(prop => {
      desc += '\n' + generateFieldDescription(prop, indent + '    ');
    });
  }
  
  return desc;
}

export function generatePrompt(fields) {
  const requiredFields = fields.filter(f => f.required);
  const optionalFields = fields.filter(f => !f.required);

  const prompt = `Given the following details, respond with only JSON data. Do not include any text, explanation, or additional formatting:

${requiredFields.length > 0 ? `Required fields:
${requiredFields.map(f => generateFieldDescription(f)).join('\n')}` : ''}

${optionalFields.length > 0 ? `Optional fields:
${optionalFields.map(f => generateFieldDescription(f)).join('\n')}` : ''}

Respond in the following JSON structure:
${JSON.stringify(fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: generateFieldStructure(field)
  }), {}), null, 2)}`;

  return prompt;
}
