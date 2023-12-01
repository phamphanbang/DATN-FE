import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "../client/PageHeader";
import { PageFooter } from "../client/PageFooter";
import ScrollToTop from "hooks/ScrollToTop";
const UserLayout = () => {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <ScrollToTop />
      <PageHeader />
      <Box flex={1}>
        <Outlet />
      </Box>
      <PageFooter />
    </Flex>
  );
};

export default UserLayout;
