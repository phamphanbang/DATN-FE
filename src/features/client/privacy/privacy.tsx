import { Box, Flex } from "@chakra-ui/react";

const Privacy = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"100%"}
      my={"30px"}
    >
      <Box
        padding={"30px 50px"}
        backgroundColor={"white"}
        w={"80%"}
        borderRadius={"10px"}
        border={`1px solid #c7c7c7`}
      >
        <Box fontSize={"30px"} fontWeight={"700"} p={"8px"}>
          Điều khoản bảo mật
        </Box>
        <Box p={"8px"}>
          Trang này được sử dụng để thông báo cho khách truy cập trang web về
          chính sách của chúng tôi với việc thu thập, sử dụng và tiết lộ Thông
          tin cá nhân nếu có ai quyết định sử dụng Dịch vụ của chúng tôi, trang
          web TOEICAMP.
        </Box>
        <Box p={"8px"}>
          Nếu bạn chọn sử dụng Dịch vụ của chúng tôi, thì bạn đồng ý với việc
          thu thập và sử dụng thông tin liên quan đến chính sách này. Thông tin
          Cá nhân mà chúng tôi thu thập được sử dụng để cung cấp và cải thiện
          Dịch vụ. Chúng tôi sẽ không sử dụng hoặc chia sẻ thông tin của bạn với
          bất kỳ ai trừ khi được mô tả trong Chính sách bảo mật này.
        </Box>
      </Box>
    </Flex>
  );
};

export default Privacy;
