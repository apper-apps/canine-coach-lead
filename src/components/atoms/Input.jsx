import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  size = "md",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full border transition-colors duration-200 bg-white focus:outline-none focus:ring-2";
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-4px",
    md: "px-4 py-3 text-base rounded-4px",
    lg: "px-5 py-4 text-lg rounded-6px"
  };
  
  const errorStyles = error 
    ? "border-error focus:border-error focus:ring-red-500" 
    : "border-gray-300 focus:border-primary-500 focus:ring-primary-500";

  return (
    <input
      type={type}
      className={cn(baseStyles, sizes[size], errorStyles, className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;