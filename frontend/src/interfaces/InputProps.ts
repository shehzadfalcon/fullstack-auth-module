/**
 * Interface for the props of the Input component.
 * @interface InputProps
 * @property {string} placeholder - The placeholder text for the input.
 * @property {string} [className] - Additional classes for styling.
 * @property {"sm" | "md" | "lg"} [size="sm"] - The size of the input.
 * @property {"text" | "password" | "number" | "email" | "date" | "datetime-local" | "month" | "search" | "tel" | "time" | "url" | "week"} [type="text"] - The type of the input element.
 * @property {string} [spanClass] - Additional classes for the span element.
 * @property {string} name - The name of the input.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [rest] - Additional HTML input attributes.
 * @property {any} [register] - The register function.
 * @property {string | number} [value] - The value of the input.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - The onChange event handler.
 * @property {number | string} [max] - The maximum value for numeric inputs.
 * @property {number | string} [min] - The minimum value for numeric inputs.
 * @property {number | string} [step] - The step value for numeric inputs.
 * @property {string} [prefix] - The prefix for the input value.
 * @property {string} [pattern] - The pattern for input validation.
 * @property {string} [title] - The title for input validation.
 * @property {boolean} [disabled] - Whether the input is disabled.
 * @property {string} [error] - The error message for the input.
 * @property {boolean} [autoFocus] - Whether the input should autoFocus.
 * @property {() => void} [onBlur] - The onBlur event handler.
 * @property {string} [label] - The label text for the input.
 * @property {FormikProps<any>} [formik] - The Formik props object.
 * @property {boolean} [hideErrors] - Whether to hide Formik errors.
 * @property {(event: React.KeyboardEvent<HTMLTextAreaElement>) => void} [onKeyDown] - The onKeyDown event handler.
 */

import { ChangeEvent } from "react";
import { FormikProps } from "formik";

export interface InputProps {
  placeholder: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?:
    | "text"
    | "password"
    | "number"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";
  spanClass?: string;
  name: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
  register?: any;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  max?: number | string;
  min?: number | string;
  step?: number | string;
  prefix?: string;
  pattern?: string;
  title?: string;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
  label?: string;
  formik?: FormikProps<any>;
  hideErrors?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
