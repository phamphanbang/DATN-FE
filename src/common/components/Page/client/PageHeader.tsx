import { Flex, HStack, Image, Link } from "@chakra-ui/react";
import LogoWeb from "assets/images/logo_full_sm.webp";

export const PageHeader = () => {
  return (
    <HStack
      py="15px"
      px="24px"
      alignItems="center"
      display="flex"
      justifyContent="space-between"
      position="sticky"
      boxShadow="0 4px 4px -4px rgba(0,0,0,.2)"
      flexWrap="wrap"
      top="0"
      background="white"
    >
      <Flex>
        <Link href="/">
          <Image src={LogoWeb} alt="logo" h="30px" />
        </Link>
      </Flex>
      <Flex
        gap="10px"
        color="blue.400"
        fontWeight="600"
        fontSize="14px"
        alignItems="center"
      >
        <Link href="/" _hover={{ textDecoration: "none", color: "blue.600" }}>
          Khoá học online
        </Link>
        <Link href="/" _hover={{ textDecoration: "none", color: "blue.600" }}>
          Đề thi online
        </Link>
        <Link href="/" _hover={{ textDecoration: "none", color: "blue.600" }}>
          Flashcards
        </Link>
        <Link href="/" _hover={{ textDecoration: "none", color: "blue.600" }}>
          Blog
        </Link>
        <Link href="/" _hover={{ textDecoration: "none", color: "blue.600" }}>
          Kích hoạt khoá học
        </Link>
        <Link
          href="/"
          _hover={{ textDecoration: "none", background: "blue.300" }}
          style={{}}
          p="7px"
          color="white"
          background="blue.500"
          borderRadius="20px"
        >
          Đăng nhập
        </Link>
      </Flex>
    </HStack>
  );
};
