import clsx from "clsx";
import React from "react";

/**
 * Props for the Label component.
 * @interface LabelProps
 * @property {React.ReactNode} children - The content of the label.
 * @property {string} [className] - Additional classes for styling.
 */

interface LabelProps {
  children: any;
  className?: string;
}
/**
 * Label component for form labels.
 * @param {LabelProps} props - The props for the Label component.
 * @returns {JSX.Element} The Label component.
 */
export function Label({ children, className }: LabelProps): JSX.Element {
  return (
    <label
      htmlFor={children}
      className={clsx(className, "form-label floating-label")}
    >
      {children}
    </label>
  );
}
