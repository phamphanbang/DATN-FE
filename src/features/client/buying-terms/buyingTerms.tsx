import { Box, Flex } from "@chakra-ui/react";

const BuyingTerms = () => {
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
          Điều khoản và Điều Kiện Giao Dịch
        </Box>
        <Box p={"8px"}>
          Bảo đảm rằng mọi giao dịch thực hiện thông qua tài khoản của Quý khách
          được thực hiện bởi chính Quý khách hoặc người được ủy quyền hợp pháp
          của mình, đồng thời, thừa nhận tính pháp lý và ràng buộc của tất cả
          các giao dịch được thực hiện thông qua tài khoản này, bao gồm nhưng
          không giới hạn giao dịch mua hàng, yêu cầu dịch vụ và thanh toán.
        </Box>
        <Box p={"8px"}>
          Có trách nhiệm bảo mật tuyệt đối thông tin tài khoản mà mình được cấp.
          TOEICAMP sẽ không chịu trách nhiệm về mọi vấn đề phát sinh và rủi ro từ
          việc Quý khách tiết lộ thông tin tài khoản cho bất kỳ bên nào. Trong
          một chừng mực nào đó do TOEICAMP đánh giá, nếu mức độ rủi ro do việc
          tiết lộ thông tin về tài khoản của Quý khách gây ảnh hưởng với việc
          cung cấp dịch vụ của TOEICAMP, TOEICAMP có quyền đơn phương tạm ngưng cung
          cấp dịch vụ cho Quý khách cho đến khi rủi ro này và hậu quả do rủi ro
          gây ra được khắc phục hoàn toàn.
        </Box>
      </Box>
    </Flex>
  );
};

export default BuyingTerms;
