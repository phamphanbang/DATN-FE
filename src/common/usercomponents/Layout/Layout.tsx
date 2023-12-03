import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "../client/PageHeader";
import { PageFooter } from "../client/PageFooter";
import ScrollToTop from "hooks/ScrollToTop";
import { useEffect } from "react";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";
const UserLayout = () => {
  useEffect(() => {
    setItem(LocalStorageKeys.notFoundUrl, '/notFound');
  },[]);
  return (
    <Flex direction={"column"} minH={"100dvh"}>
      <ScrollToTop />
      <PageHeader />
      <Box flex={1} backgroundColor={'#f5f5f5'}>
        <Outlet />
      </Box>
      <PageFooter />
    </Flex>
  );
};

export default UserLayout;
