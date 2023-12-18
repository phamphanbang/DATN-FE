import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react";
import { useGetHistoryDetail } from "api/apiHooks/examHook";
import theme from "themes/theme";
import UserNotFound from "features/client/notFound/UserNotFound";
import HistoryInfo from "./HistoryInfo";
import HistoryAnswer from "./HistoryAnswer";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface IExamDetail {
  examId: string;
  historyId: string;
}

const HistoryDetail = ({ examId, historyId }: IExamDetail) => {
  const { data, isLoading } = useGetHistoryDetail(examId, historyId);

  const setTitle = (type: string) => {
    if (type === "fulltest") return "thi";
    return "luyện tập";
  };

  const labelBox = (content: string, bg: string) => {
    return (
      <Box
        color={"#fff"}
        backgroundColor={bg}
        borderRadius={"5px"}
        // fontSize={"75%"}
        fontWeight={"600"}
        px={"10px"}
        mt={"5px"}
      >
        {content}
      </Box>
    );
  };

  const renderParts = (parts: number[]) => {
    return parts.map((i) => {
      return labelBox("Part " + i.toString(), "#ffad3b");
    });
  };

  const renderLabel = (
    exam_type: string,
    test_type: string,
    parts: number[]
  ) => {
    if (exam_type === "test") {
      return <Flex>{labelBox("Thi thử", "#3cb46e")}</Flex>;
    }
    return (
      <Flex wrap={"wrap"} gap={"10px"}>
        {labelBox("Luyện tập", "#ffad3b")}
        {test_type == "fulltest"
          ? labelBox("Full test", "#ffad3b")
          : renderParts(parts)}
      </Flex>
    );
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  return (
    <Flex w={"70%"} flexDirection={"column"} my={"30px"}>
      <Box
        mb={"15px"}
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        border={`1px solid #c7c7c7`}
      >
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : !data ? (
          <UserNotFound />
        ) : (
          <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Box fontSize={"25px"} fontWeight={"700"} p={"8px"}>
                Kết quả {setTitle(data.test_type)} : {data?.name ?? ""}
              </Box>
              <Button
                ml={"10px"}
                border={"1px solid #2b6cb0"}
                backgroundColor={"white"}
                color={"#2b6cb0"}
                _hover={{
                  border: "1px solid #2b6cb0",
                  backgroundColor: "#2b6cb0",
                  color: "white",
                }}
                onClick={() => {
                  queryClient.clear();
                  navigate("/exams/" + examId);
                }}
              >
                Quay về trang đề thi
              </Button>
            </Flex>
            {renderLabel(
              data.exam_type,
              data.test_type,
              data.parts.map((item) => item.order_in_test)
            )}
            <HistoryInfo history={data} />
            {data.exam_type == "practice" && <HistoryAnswer history={data} />}
            {/* <HistoryAnswer history={data} /> */}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default HistoryDetail;
