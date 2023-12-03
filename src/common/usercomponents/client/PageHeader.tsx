import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import LogoWeb from "assets/images/logo_full_sm.webp";
import { NavLink } from "../NavLink";
import { getImage, getItem, removeItem } from "utils";
import { LocalStorageKeys } from "common/enums";
import { useNavigate } from "react-router-dom";

export const PageHeader = () => {
  const navigate = useNavigate();
  const accessToken: string | null = getItem(LocalStorageKeys.accessToken);
  const avatar: string | null = getItem(LocalStorageKeys.avatar);
  const userId: string | null = getItem(LocalStorageKeys.id);
  const userName: string | null = getItem(LocalStorageKeys.name);
  const isUnauthorized = accessToken === null;

  const onNavigate = (to: string, logout?: boolean) => () => {
    if (logout) {
      removeItem(LocalStorageKeys.accessToken);
      removeItem(LocalStorageKeys.name);
      removeItem(LocalStorageKeys.isAdmin);
      removeItem(LocalStorageKeys.avatar);
      removeItem(LocalStorageKeys.id);
      navigate(to);
    }
  };
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
      zIndex="10"
    >
      <Flex>
        <Link href="/">
          <Image src={LogoWeb} alt="logo" h="30px" />
        </Link>
      </Flex>
      <Flex gap="10px" fontWeight="600" fontSize="14px" alignItems="center">
        <NavLink color="blue.400" to="/" text="Trang chủ" />
        <NavLink color="blue.400" to="/exams" text="Đề thi online" />
        <NavLink color="blue.400" to="/blogs" text="Blog" />
        {isUnauthorized ? (
          <NavLink
            to="/login"
            text="Đăng nhập"
            color="white"
            _hover={{ background: "blue.800", textDecoration: "none" }}
            background="blue.600"
            borderRadius="20px"
          />
        ) : (
          <Menu>
            <MenuButton>
              <Image
                boxSize="30px"
                src={getImage("users/" + userId, avatar as string)}
                alt="User Avatar"
                mx={"auto"}
                borderRadius={"full"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem onClick={onNavigate("/", true)}>Đăng xuất</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </HStack>
  );
};
