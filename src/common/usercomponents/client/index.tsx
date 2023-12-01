import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { PageBody } from "./PageBody";
import { PageFooter } from "./PageFooter";

interface PageProps extends BoxProps {
  children: ReactNode;
}

const ClientPage = ({ children, ...props }: PageProps) => {
  return <Box minH={'100vh'} {...props}>{children}</Box>;
};

ClientPage.Header = PageHeader;
ClientPage.Body = PageBody;
ClientPage.PageFooter = PageFooter;

export default ClientPage;
