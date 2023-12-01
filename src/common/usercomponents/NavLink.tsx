import { As, Icon, Link, LinkProps } from "@chakra-ui/react";
import { NavLink as NavLinkComponent } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  to: string;
  text: string;
  onClick?: () => void;
}

export const NavLink = ({ to, text, onClick, ...props }: NavLinkProps) => {
  return (
    <Link
      as={NavLinkComponent}
      to={to}
      px="8px"
      py="6px"
      color={"blue.700"}
      _hover={{ textDecoration: "none", color: "blue.800" }}
      onClick={onClick}
      {...props}
    >
      {text}
    </Link>
  );
};
