import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "common/usercomponents/NavLink";
import ClientPage from "common/usercomponents/client";
import theme from "themes/theme";

const UserNotFound = () => {
  return (
    // <ClientPage>
    //   <ClientPage.Header />

    //   <ClientPage.Body>
    //     <h1>Trang web mà bạn truy cập hiện tại không khả dụng</h1>
    //   </ClientPage.Body>

    //   <ClientPage.PageFooter />
    // </ClientPage>
    <Flex justifyContent={'center'} alignItems={'center'} h={'100%'}>
      <Box 
        padding={'30px 50px'}
        border={`1px solid ${theme.colors.borderColor}`}
        borderRadius={"10px"}
        >
        <h1>Không tìm thấy trang</h1>
        <h1>Xin lỗi chúng tôi không tìm thấy trang web bạn muốn tới..</h1>
        {/* <Link
          href="/"
          _hover={{ color: "blue.800" }}
          color="blue.600"
          textDecoration={"none"}
        >
          Quay về trang chủ
        </Link> */}
        <NavLink to="/" text="Quay về trang chủ" />
      </Box>
    </Flex>
  );
};

export default UserNotFound;
