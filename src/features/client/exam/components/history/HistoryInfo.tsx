import { Flex, Box, Text } from "@chakra-ui/react";
import { ExamHistoryDetail } from "models/exam";
import { BiBullseye } from "react-icons/bi";
import {
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { TbPennantFilled } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

interface IHistoryInfo {
  history: ExamHistoryDetail;
}

const HistoryInfo = ({ history }: IHistoryInfo) => {
  return (
    <Flex my={"20px"}>
      <Flex
        backgroundColor={"#f5f5f5"}
        flexDirection={"column"}
        border={"1px solid #d5d5d5"}
        borderRadius={"10px"}
        w={"30%"}
      >
        <Flex
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          gap={"10px"}
          p={"10px"}
        >
          <Box fontSize={"20px"}>
            <TiTick />
          </Box>
          <Box w={"125px"}>Kết quả làm bài</Box>
          <Box textAlign={"end"} fontWeight={"500"} marginLeft={"auto"}>
            {history.right_questions + " / " + history.total_questions}
          </Box>
        </Flex>
        <Flex
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          gap={"10px"}
          p={"10px"}
        >
          <Box fontSize={"20px"}>
            <BiBullseye />
          </Box>
          <Box w={"125px"}>Độ chính xác</Box>
          <Box
            textAlign={"end"}
            fontWeight={"500"}
            w={"30%"}
            marginLeft={"auto"}
          >
            {(
              (history.right_questions / history.total_questions) *
              100
            ).toFixed(2) + "%"}
          </Box>
        </Flex>
        <Flex
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          gap={"10px"}
          p={"10px"}
        >
          <Box fontSize={"20px"}>
            <FaRegClock />
          </Box>
          <Box w={"125px"}>Thời gian hoàn thành</Box>
          <Box textAlign={"end"} fontWeight={"500"} marginLeft={"auto"}>
            {history.duration}
          </Box>
        </Flex>
      </Flex>
      <Box w={"80%"}>
        <Flex justifyContent={"space-between"} px={"10px"} gap={"10px"}>
          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#3cb46e"} fontSize={"25px"}>
              <FaCheckCircle />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#3cb46e"}
              w={"100%"}
              textAlign={"center"}
            >
              Trả lời đúng
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {history.right_questions}
            </Text>
            <Text w={"100%"} textAlign={"center"}>
              Câu hỏi
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#e43a45"} fontSize={"25px"}>
              <FaTimesCircle />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#e43a45"}
              w={"100%"}
              textAlign={"center"}
            >
              Trả lời sai
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {history.wrong_questions}
            </Text>
            <Text w={"100%"} textAlign={"center"}>
              Câu hỏi
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#71869d"} fontSize={"25px"}>
              <FaMinusCircle />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#71869d"}
              w={"100%"}
              textAlign={"center"}
            >
              Bỏ qua
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {history.total_questions -
                history.right_questions -
                history.wrong_questions}
            </Text>
            <Text w={"100%"} textAlign={"center"}>
              Câu hỏi
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            color={"#35509a"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} fontSize={"30px"}>
              <TbPennantFilled />
            </Flex>
            <Text
              fontSize={"25px"}
              fontWeight={"500"}
              w={"100%"}
              textAlign={"center"}
            >
              Điểm
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {history.score}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HistoryInfo;
