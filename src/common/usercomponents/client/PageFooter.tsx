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
import LogoWeb from "assets/images/logo_full_sm.webp";
import TwitterIcon from "assets/twitter-154-svgrepo-com.svg";
import InstagramIcon from "assets/insta-svgrepo-com.svg";
import LinkedinIcon from "assets/linkedin-svgrepo-com.svg";
import theme from "themes/theme";

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
        justifyContent="space-between"
        gap="20px"
      >
        <VStack alignItems="start" maxW="250px" flex="1">
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

        <VStack maxW="250px" flex="2" alignItems="start">
          <Box fontWeight="700">Khoá học online</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link href="#">
                [Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện
                nghe với Dictation [Tặng khoá TED Talks]
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#">
                [IELTS Fundamentals] Từ vựng và ngữ pháp cơ bản IELTS
              </Link>
            </ListItem>
          </List>
        </VStack>

        <VStack maxW="250px" flex="2" alignItems="start">
          <Box fontWeight="700">Tài nguyên</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link href="#">Lịch khai giảng</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Thư viện đề thi</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Bài viết</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Kho tài liệu</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Live class</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Study spaces</Link>
            </ListItem>
          </List>
        </VStack>

        <VStack maxW="250px" flex="2" alignItems="start">
          <Box fontWeight="700">Hỗ trợ</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link href="#">Hướng dẫn sử dụng</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Hướng dẫn mua hàng</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Chăm sóc khách hàng</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Phản hồi khiếu nại</Link>
            </ListItem>
          </List>
        </VStack>

        <VStack maxW="250px" flex="2" alignItems="start">
          <Box fontWeight="700">STUDY4</Box>
          <List display="flex" flexDirection="column" fontSize="15.3px">
            <ListItem>
              <Link href="#">Về chúng tôi</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Liên hệ</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Điều khoản bảo mật</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Điều khoản sử dụng</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Điều khoản và Điều Kiện Giao Dịch</Link>
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
