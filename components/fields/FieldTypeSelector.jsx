import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FieldTypeSelector({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="select DataType" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="string">String</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        <SelectItem value="boolean">Boolean</SelectItem>
        <SelectItem value="array">Array</SelectItem>
        <SelectItem value="object">Object</SelectItem>
      </SelectContent>
    </Select>
  );
}
