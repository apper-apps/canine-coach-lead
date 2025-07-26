import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  error,
  multiline = false,
  rows = 4,
  placeholder,
  className,
  ...props 
}) => {
  const InputComponent = multiline ? Textarea : Input;
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <InputComponent
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
        rows={multiline ? rows : undefined}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;