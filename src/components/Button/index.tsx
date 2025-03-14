import clsx from "clsx";
import { BaseProps } from "../../types/common";
import { AllHTMLAttributes, HTMLAttributes } from "react";

interface IButton extends BaseProps, AllHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ className, children, ...props }: IButton) => {
  return (
    <button
      type="button"
      className={clsx("px-2 py-1 rounded  bg-slate-700 cursor-pointer text-sm shadow", className)}
      {...props}
    >
      {children}
    </button>
  );
};
