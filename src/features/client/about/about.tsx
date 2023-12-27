import { Box, Flex } from "@chakra-ui/react";

const About = () => {
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
          Về chúng tôi
        </Box>
        <Box p={"8px"}>
          TOEICAMP là một trong những thương hiệu cung cấp phần mềm tự học tiếng
          Anh trực tuyến uy tín nhất cho người dùng tại Việt Nam. Với quy trình
          nghiên cứu chuyên sâu của nhiều chuyên gia có kinh nghiệm, Chúng tôi
          cung cấp cho người dùng phần mềm tự học tiếng Anh với giao diện thân
          thiện, dễ sử dụng và các phần thi được thiết kế với bố cục, thời lượng
          tương tự như kỳ thi tiếng Anh thực tế với số lượng đề thi khủng được
          thu thập từ các nguồn uy tín. Nhờ đó người dùng có thể tự ôn tập,
          luyện thi cấp tốc để chuẩn bị cho các kỳ thi TOEIC, đồng thời rèn
          luyện các kỹ năng ngôn ngữ một cách toàn diện nhất.
        </Box>
      </Box>
    </Flex>
  );
};

export default About;
