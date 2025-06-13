import { HTMLAttributes, ElementType } from "react";
import styles from "./Text.module.css";

type TextProps = {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h6small" | "xl" | "lg" | "md" | "sm" | "xs";
  component?: ElementType;
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const variantMap: Record<string, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h6small: "h6",
  xl: "p",
  lg: "p",
  md: "p",
  sm: "p",
  xs: "p",
};

/** JS DOCS
 * Text component
 * @param {string} variant - The variant of the text to render.
 * @param {ElementType} component - HTML tag to render (controls semantic).
 * @param {React.ReactNode} children - The content of the text.
 * @property {string} className - Additional class name(s) for the component.
 * @param {object} props - Additional props to pass to the text element.
 */

export function Text({
  variant = "md",
  component,
  children,
  className,
  ...props
}: TextProps) {
  const Component = component || variantMap[variant];
  const classVariant = styles[variant];

  return (
    <Component
      className={`${styles.text} ${classVariant} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
