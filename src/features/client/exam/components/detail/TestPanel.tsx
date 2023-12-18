import {
  Flex,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { IUserExamDetail } from "models/exam";
import clock from "assets/clock.svg";
import edit from "assets/edit.svg";
import { MdErrorOutline } from "react-icons/md";
import HistoryTable from "./HistoryTable";
import {
  useNavigate,
} from "react-router-dom";
import { getItem } from "utils";
import { LocalStorageKeys } from "common/enums";

interface IDetailPanel {
  exam: IUserExamDetail;
}

const TestPanel = ({ exam }: IDetailPanel) => {
  const navigate = useNavigate();
  const token = getItem(LocalStorageKeys.accessToken) ?? "";

  const onStart = () => {
    navigate("/exams/" + exam.id + "/start");
  };

  return (
    <Flex>
      <Box>
        <Flex mb={"5px"} alignItems={"center"} as="span">
          <Image src={clock} alt="clock" h="17px" w="17px" />
          <Text ml={"5px"} as="span" textOverflow={"clip"}>
            {exam.duration} phút |
          </Text>
          <Text ml={"5px"} as="span">
            {exam.total_parts} phần thi |
          </Text>
          <Text ml={"5px"} as="span">
            {exam.total_questions} câu hỏi |
          </Text>
          <Text ml={"5px"} as="span">
            {exam.comments_count} bình luận
          </Text>
        </Flex>
        <Flex mb={"5px"} alignItems={"center"} as="span">
          <Image src={edit} alt="edit" h="17px" w="17px" />
          <Text ml={"5px"} as="span" textOverflow={"clip"}>
            {exam.total_views} người đã luyện tập đề thi này
          </Text>
        </Flex>
        {exam.histories.length > 0 && (
          <HistoryTable histories={exam.histories} examId={exam.id} />
        )}

        <Flex
          alignItems={"center"}
          color={"#855a1f"}
          backgroundColor={"#ffefd8"}
          borderColor={"#ffe8c8"}
          p={"10px"}
        >
          <MdErrorOutline />
          <Text pl={"10px"}>
            Sẵn sàng để bắt đầu làm full test? Để đạt được kết quả tốt nhất, bạn
            cần dành ra {exam.duration} phút cho bài test này.
          </Text>
        </Flex>
        {token ? (
          <Button
            mt="14px"
            _hover={{ background: "blue.800" }}
            background="blue.600"
            color="white"
            onClick={onStart}
          >
            Bắt đầu thi
          </Button>
        ) : (
          <Text ml={"10px"} mt="14px" fontStyle={"italic"}>
            Bạn cần đăng nhập để có thể bắt đầu thi.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default TestPanel;
