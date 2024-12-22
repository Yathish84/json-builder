import React from 'react';
import { Textarea } from '../ui/textarea';



export function FieldDescription({ value, onChange }) {
  return (
    <Textarea
      placeholder="Field Description"
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
    />
  );
}