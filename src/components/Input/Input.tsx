// Input.tsx
import { Text } from "../Text/Text";
import s from "./Input.module.css";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
  error?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

/** 
 * Input component
 * @param {string} error - Error message to display.
 * @param {string} className - Additional class name(s) for the component.
 * @param {object} props - Additional props to pass to the input element.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className={`${s.container} ${className || ""}`}>
        <input ref={ref} className={`${s.input}`} {...props} />
        {error && (
          <Text variant="xs" className={s.errorText}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
