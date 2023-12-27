import { Box, Flex } from "@chakra-ui/react";

const Terms = () => {
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
          Điều khoản sử dụng
        </Box>
        <Box p={"8px"}>
          Bằng cách truy cập trang web này, truy cập từ TOEICAMP, bạn đồng ý bị
          ràng buộc bởi các Điều khoản và Điều kiện Sử dụng Trang web này và
          đồng ý rằng bạn chịu trách nhiệm về thỏa thuận với bất kỳ luật địa
          phương hiện hành nào. Nếu bạn không đồng ý với bất kỳ điều khoản nào
          trong số này, bạn bị cấm truy cập trang web này. Các tài liệu trong
          trang web này được bảo vệ bởi luật bản quyền và thương hiệu.
        </Box>
        <Box p={"8px"}>
          Khi mọi người đứng đằng sau ý kiến ​​và hành động của họ, cộng đồng
          của chúng tôi an toàn hơn và có trách nhiệm hơn. Vì lý do đó, bạn
          phải: Sử dụng cùng tên mà bạn sử dụng trong cuộc sống hàng ngày. Cung
          cấp thông tin chính xác về bản thân bạn. Chỉ tạo một tài khoản (của
          riêng bạn) và sử dụng dòng thời gian của bạn cho mục đích cá nhân.
          Không chia sẻ mật khẩu của bạn, cấp quyền truy cập vào tài khoản
          TOEICAMP của bạn cho người khác hoặc chuyển tài khoản của bạn cho bất kỳ
          ai khác (mà không có sự cho phép của chúng tôi).
        </Box>
      </Box>
    </Flex>
  );
};

export default Terms;
