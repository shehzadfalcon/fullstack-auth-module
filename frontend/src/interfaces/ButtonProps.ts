export interface ButtonProps {
  variant?: "solid" | "outline";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  className?: string;
  href?: string;
  children: React.ReactNode;
  loaderClass?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}
