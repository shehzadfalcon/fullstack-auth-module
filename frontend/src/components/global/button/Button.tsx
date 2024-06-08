import clsx from "clsx";
import { ImSpinner9 } from "react-icons/im";
import { ButtonSizeStyles } from "../../../interfaces/ButtonSizeStyles";
import { ButtonProps } from "../../../interfaces/ButtonProps";
/**
 * Styles for different button variants.
 * @type {Record<string, string>}
 */
const baseStyles: Record<string, string> = {
  solid: "btn",
  outline: "btn-outline",
};
/**
 * Styles for different variant-color combinations of buttons.
 * @type {Record<string, Record<string, string>>}
 */
const variantStyles: Record<string, Record<string, string>> = {
  solid: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
  },
  outline: {
    primary: "btn-outline-primary",
    secondary: "btn-outline-secondary",
    success: "btn-outline-success",
    danger: "btn-outline-danger",
    warning: "btn-outline-warning",
    info: "btn-outline-info",
    light: "btn-outline-light",
    dark: "btn-outline-dark",
  },
};
/**
 * Styles for different button sizes.
 * @type {ButtonSizeStyles}
 */
const sizeStyles: ButtonSizeStyles = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};
/**
 * Button component.
 * @param {ButtonProps} props - Button component props.
 * @returns {JSX.Element} - Rendered Button component.
 */
export function Button({
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  href,
  type,
  disabled,
  isLoading,
  children,
  loaderClass,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        sizeStyles[size],
        className
      )}
      type={type ? type : "button"}
      disabled={disabled ?? false}
      {...props}
    >
      {isLoading ? (
        <ImSpinner9 className={clsx("animate-spin text-2xl", loaderClass)} />
      ) : (
        children
      )}
    </button>
  );
}
