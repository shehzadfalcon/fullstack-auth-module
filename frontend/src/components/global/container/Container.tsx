import clsx from "clsx";

/**
 * Interface for the props of the Container component.
 * @interface ContainerProps
 * @property {string} [className] - Additional classes for styling.
 * @property {"xs" | "sm" | "md" | "lg" | "xl" | "xxl"} [size="sm"] - The size of the container.
 * @property {React.ReactNode} [children] - The children components.
 */
interface ContainerProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  children?: React.ReactNode;
}

/**
 * Styles for different container sizes.
 * @type {Record<"xs" | "sm" | "md" | "lg" | "xl" | "xxl", string>}
 */
const sizeStyles: Record<"xs" | "sm" | "md" | "lg" | "xl" | "xxl", string> = {
  xs: "container-xs",
  sm: "container-sm",
  md: "container-md",
  lg: "container-lg",
  xl: "container-xl",
  xxl: "container-xxl",
};

/**
 * Container component for wrapping content within different container sizes.
 * @param {ContainerProps} props - The props for the Container component.
 * @returns {JSX.Element} - The rendered Container component.
 */
export function Container({
  size = "sm",
  className,
  ...props
}: ContainerProps): JSX.Element {
  return <div className={clsx(sizeStyles[size], className)} {...props} />;
}
