import React from 'react';
import { Checkbox } from '../ui/checkbox';



export function RequiredCheckbox({ checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={onChange}

      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Required
      </label>
    </div>
  );
}