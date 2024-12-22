
export function isFieldValid(field) {
  // Check basic field properties
  if (!field.name.trim() || !field.description.trim()) {
    return false;
  }

  // Check nested object properties
  if (field.type === 'object' && field.properties) {
    return Object.values(field.properties).every(isFieldValid);
  }

  // Check array items if they're objects
  if (field.type === 'array' && field.items?.type === 'object') {
    return Object.values(field.items.properties || {}).every(isFieldValid);
  }

  return true;
}

export function canGeneratePrompt(fields) {
  return fields.length > 0 && fields.every(isFieldValid);
}