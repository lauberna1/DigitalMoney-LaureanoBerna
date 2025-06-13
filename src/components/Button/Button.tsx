import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./Button.module.css";
import { BounceLoader } from "react-spinners";

/** 
 * Button component
 * @param {string} text - Text to display inside the button.
 * @param {() => void} onClick - Function to call when the button is clicked.
 * @param {boolean} icon - Whether to display an icon or not.
 * @param {string} variant - Variant of the button to display.
 * @param {string} size - Size of the button to display.
 * @param {React.CSSProperties} style - Additional styles to apply to the button.
 * @param {string} href - URL to link to when the button is clicked.
 * @param {string} type - Type of the button to display.
 * @param {boolean} loading - Whether to display a loading spinner or not.
 */

export function Button({
  text,
  onClick,
  icon = false,
  variant = "primary",
  size = "normal",
  style,
  href,
  type = "button",
  loading = false,
  ...params
}: {
  text: string;
  onClick?: () => void;
  icon?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "fourth";
  size?: "big" | "normal" | "small" | "custom";
  style?: React.CSSProperties;
  href?: string;
  type?: "button" | "submit";
  loading?: boolean;
}) {
  const classVariant = s[variant];
  const buttonContent = (
    <>
      <>{loading ? <BounceLoader size="30px" /> : text}</>
      {icon && <FaArrowRightLong className={s.icon} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${s.button} ${classVariant} ${s[size]}`}
        style={style}
        {...params}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${s.button} ${classVariant} ${s[size]}`}
      style={style}
      type={type}
      {...params}
    >
      {buttonContent}
    </button>
  );
}
