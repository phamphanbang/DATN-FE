import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import LogoWeb from "assets/images/logo_full_sm.png";
import TwitterIcon from "assets/twitter-154-svgrepo-com.svg";
import InstagramIcon from "assets/insta-svgrepo-com.svg";
import LinkedinIcon from "assets/linkedin-svgrepo-com.svg";
import theme from "themes/theme";
import { NavLink as NavLinkComponent } from "react-router-dom";

export const PageFooter = () => {
  return (
    <VStack
      px="24px"
      py="20px"
      gap="5px"
      pt={"30px"}
      borderTop={`1px solid ${theme.colors.borderColor}`}
    >
      <HStack
        alignItems="start"
        display="flex"
        justifyContent="flex-start"
        gap="40px"
        w={"100%"}
      >
        <VStack alignItems="start" maxW="350px" flex="2">
          <Image src={LogoWeb} alt="logo-web-footer" h="30px" />
          <Text fontSize="18px" fontWeight="700">
            &#169; 2023
          </Text>
          <Flex gap="5px">
            <Link href="#" isExternal={true}>
              <Image
                src={InstagramIcon}
                h="25px"
                w="25px"
                alt="instagram-icon"
              />
            </Link>
            <Link href="#" isExternal={true}>
              <Image src={TwitterIcon} h="25px" w="25px" alt="twitter-icon" />
            </Link>
            <Link href="#" isExternal={true}>
              <Image src={LinkedinIcon} h="25px" w="25px" alt="linkedin-icon" />
            </Link>
          </Flex>
        </VStack>

        <VStack maxW="350px" flex="2" alignItems="start">
          <Box fontWeight="700">Tài nguyên</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link as={NavLinkComponent} to={"/exams"}>
                Thư viện đề thi
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NavLinkComponent} to={"/blogs"}>
                Bài viết
              </Link>
            </ListItem>
          </List>
        </VStack>

        <VStack maxW="350px" flex="2" alignItems="start">
          <Box fontWeight="700">TOECIAMP</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link as={NavLinkComponent} to={"/about"}>
                Về chúng tôi
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NavLinkComponent} to={"/contact"}>
                Liên hệ
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NavLinkComponent} to={"/privacy"}>
                Điều khoản bảo mật
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NavLinkComponent} to={"/terms"}>
                Điều khoản sử dụng
              </Link>
            </ListItem>
            <ListItem>
              <Link as={NavLinkComponent} to={"/buying-terms"}>
                Điều khoản và Điều Kiện Giao Dịch
              </Link>
            </ListItem>
          </List>
        </VStack>
      </HStack>

      <HStack w="100%" mt="20px" justifyContent="center">
        <Box fontWeight="700">Địa chỉ:</Box>
        <Box>Đại học Bách Khoa Đà Nẵng</Box>
      </HStack>

      <Box>&#169; 2023</Box>
    </VStack>
  );
};
