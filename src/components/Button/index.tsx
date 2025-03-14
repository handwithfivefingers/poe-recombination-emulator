import clsx from "clsx";
import { AllHTMLAttributes } from "react";
import { BaseProps } from "../../types/common";

interface IButton extends BaseProps, AllHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ className, children, type = "button", ...props }: IButton) => {
  return (
    <button
      type={"button"}
      className={clsx("px-2 py-1 rounded  bg-slate-700 cursor-pointer text-sm shadow", className)}
      {...props}
    >
      {children}
    </button>
  );
};
