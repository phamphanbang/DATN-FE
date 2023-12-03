import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "common/usercomponents/NavLink";
import theme from "themes/theme";

const UserNotFound = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"100%"}
      my={"30px"}
    >
      <Box
        padding={"30px 50px"}
        border={`1px solid ${theme.colors.borderColor}`}
        borderRadius={"10px"}
      >
        <Box fontSize={"30px"} fontWeight={"700"} p={"8px"}>
          Không tìm thấy trang
        </Box>
        <Box p={"8px"}>
          Xin lỗi chúng tôi không tìm thấy trang web bạn muốn tới..
        </Box>
        <NavLink to="/" text="Quay về trang chủ" />
      </Box>
    </Flex>
  );
};

export default UserNotFound;
