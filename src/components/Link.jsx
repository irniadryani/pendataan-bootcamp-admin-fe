import { classNames } from "@/lib/common";
import { NavLink as RouterNavLink } from "react-router-dom";

const variantStyles = {
  link: "text-[#4987A6] hover:opacity-75"
};

export const Link = ({ to, children, variant = "link", className, target }) => {
  return (
    <RouterNavLink
      to={to}
      target={target}
      className={classNames(variantStyles[variant], className)}
    >
      {children}
    </RouterNavLink>
  );
};
