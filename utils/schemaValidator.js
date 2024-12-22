export function validateSchema(fields){
  const errors= [];
  const fieldNames = new Set();

  function validateField(field, path) {
    // Check for empty name
    if (!field.name.trim()) {
      errors.push({
        field: path,
        message: 'Field name cannot be empty'
      });
    }

    // Check for duplicate names
    if (fieldNames.has(field.name)) {
      errors.push({
        field: path,
        message: `Duplicate field name: ${field.name}`
      });
    }
    fieldNames.add(field.name);

    // Check for empty description
    if (!field.description.trim()) {
      errors.push({
        field: path,
        message: `Description is required for field: ${field.name}`
      });
    }

    // Validate nested objects
    if (field.type === 'object' && field.properties) {
      Object.values(field.properties).forEach((prop, index) => {
        validateField(prop, `${path}.${field.name}.${index}`);
      });
    }

    // Validate array items
    if (field.type === 'array' && field.items?.type === 'object') {
      Object.values(field.items.properties || {}).forEach((prop, index) => {
        validateField(prop, `${path}.${field.name}[].${index}`);
      });
    }
  }

  fields.forEach((field, index) => validateField(field, `root.${index}`));
  return errors;
}