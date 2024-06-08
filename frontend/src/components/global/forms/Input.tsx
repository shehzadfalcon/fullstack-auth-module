/**
 * Input component for form inputs.
 * @param {Object} props - The props object.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} [props.size="sm"] - The size of the input ("sm", "md", "lg").
 * @param {string} [props.className] - Additional classes for styling.
 * @param {string} [props.value] - The value of the input.
 * @param {Function} [props.onChange] - The onChange event handler.
 * @param {string} [props.type] - The type of the input element.
 * @param {Function} [props.register] - The register function from Formik.
 * @param {number|string} [props.max] - The maximum value for numeric inputs.
 * @param {number|string} [props.min] - The minimum value for numeric inputs.
 * @param {number|string} [props.step] - The step value for numeric inputs.
 * @param {string} [props.pattern] - The pattern for input validation.
 * @param {string} [props.title] - The title for input validation.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {boolean} [props.autoFocus] - Whether the input should autoFocus.
 * @param {Function} [props.onBlur] - The onBlur event handler.
 * @param {string} [props.label] - The label text for the input.
 * @param {object} [props.formik] - The Formik props object.
 * @param {boolean} [props.hideErrors] - Whether to hide Formik errors.
 * @param {string} props.name - The name of the input.
 * @param {React.HTMLProps<HTMLInputElement>} [props.rest] - Additional HTML input attributes.
 * @returns {JSX.Element} - The Input component.
 */

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ErrorMessage } from "formik";
import clsx from "clsx";
import { SizeStyles } from "../../../interfaces/SizeStyles";
import { InputProps } from "../../../interfaces/InputProps";
import { Label } from "./Label";

const sizeStyles: SizeStyles = {
  sm: "form-control-sm",
  md: "form-control-md",
  lg: "form-control-lg",
};

const Input: React.FC<InputProps> = ({
  placeholder,
  size = "sm",
  className,
  value,
  onChange,
  type,
  register,
  max,
  min,
  step,
  pattern,
  title,
  disabled,
  error,
  autoFocus,
  onBlur,
  label,
  formik,
  hideErrors,
  name,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="relative w-full">
        {type === "password" && (
          <div className="password__eye" onClick={handleTogglePassword}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        )}

        <input
          id="floating_outlined"
          min={min}
          max={max}
          name={name}
          title={title}
          onBlur={formik?.handleBlur}
          pattern={pattern}
          value={formik ? formik.values[name] : value}
          step={step && step}
          disabled={disabled}
          onChange={formik ? formik?.handleChange : onChange}
          autoComplete="false"
          placeholder=""
          type={showPassword ? type : "text"}
          {...(register !== undefined && { ...register(name) })}
          className={clsx(className, sizeStyles[size], "form-control peer")}
          {...rest}
        />
        <Label>{label}</Label>
      </div>
      {!hideErrors && formik && formik.touched[name] && formik.errors[name] ? (
        <p className="mt-1 text-start text-sm text-red-600">
          <>{formik.errors[name]}</>
        </p>
      ) : (
        ""
      )}
      {error && (
        <ErrorMessage
          className="mt-1 block w-full text-start text-sm text-danger"
          component={"p"}
          name={error}
        />
      )}
    </>
  );
};

export default Input;
