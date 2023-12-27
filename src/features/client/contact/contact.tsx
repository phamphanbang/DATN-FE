import { Box, Flex } from "@chakra-ui/react";

const Contact = () => {
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
          Liên hệ
        </Box>
        <Box p={"8px"}>
          Xin vui lòng gửi email cho chúng tôi tại toeicamp@gmail.com. Chúng tôi
          sẽ trả lời bạn trong thời gian sớm nhất :){" "}
        </Box>
      </Box>
    </Flex>
  );
};

export default Contact;
