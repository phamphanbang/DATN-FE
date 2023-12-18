import {
  Flex,
  Text,
  Image,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Checkbox,
  VStack,
  Stack,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { IUserExamDetail } from "models/exam";
import { SelectField } from "common/components/SelectField";
import clock from "assets/clock.svg";
import edit from "assets/edit.svg";
import styles from "./style.module.scss";
import { FaRegLightbulb } from "react-icons/fa";
import { option } from "common/types";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import HistoryTable from "./HistoryTable";
import {
  NavigateOptions,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { getItem } from "utils";
import { LocalStorageKeys } from "common/enums";

interface IDetailPanel {
  exam: IUserExamDetail;
}

const DetailPanel = ({ exam }: IDetailPanel) => {
  const navigate = useNavigate();
  const token = getItem(LocalStorageKeys.accessToken) ?? "";
  const defaultSelected = Array(exam.parts.length).fill(false);
  const [selectedPart, setSelectedPart] = useState<boolean[]>(defaultSelected);
  const [duration, setDuration] = useState<string>("");

  const examDurationOption = (): option[] => {
    const step = 5;
    const num_of_step = 28;
    const option: option[] = [];
    for (let i = 1; i < num_of_step; i++) {
      option.push({
        value: (i * step).toString(),
        label: (i * step).toString(),
      });
    }
    const defaultOption: option = {
      value: "",
      label: "-- Chọn thời gian --",
    };
    return [defaultOption, ...option];
  };

  const changePart = (value: boolean, index: number) => {
    const update = [...selectedPart];
    update[index] = value;
    setSelectedPart(update);
  };

  const handleSelectChangeValue = (value: string) => {
    setDuration(value);
  };

  const onPractice = () => {
    const to = "/exams/" + exam.id + "/practice";
    const part: string[] = [];
    selectedPart.forEach((item, index) => {
      if (item === true) part.push((index + 1).toString());
    });
    const params: Record<string, string | string[]> = {
      part: part,
      duration: duration.toString(),
    };
    navigate(to + "?" + createSearchParams(params).toString());
  };

  const disablePractice = () => {
    const isSelected = selectedPart.filter((item) => item === true).length;
    return isSelected === 0 || duration === "" ? true : false;
  };

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
        <Box
          as="span"
          textOverflow={"clip"}
          fontStyle={"italic"}
          color={"#ee7782"}
        >
          Chú ý: để được quy đổi sang thang điểm 990 vui lòng chọn chế độ làm
          FULL TEST.
        </Box>
        {exam.histories.length > 0 && (
          <HistoryTable histories={exam.histories} examId={exam.id} />
        )}

        <Tabs mt={"15px"}>
          <TabList>
            <Tab fontWeight={"600"}>Luyện tập</Tab>
            <Tab fontWeight={"600"}>Làm full test</Tab>
          </TabList>

          <TabPanels>
            <TabPanel className={styles.panel} px={"0px"} pb={"0px"}>
              <Flex
                alignItems={"center"}
                color={"#1f5e39"}
                backgroundColor={"#d8f0e2"}
                borderColor={"#c8ead6"}
                p={"10px"}
              >
                <FaRegLightbulb />
                <Text pl={"10px"}>
                  Pro tips: Hình thức luyện tập từng phần và chọn mức thời gian
                  phù hợp sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay
                  vì phải chịu áp lực hoàn thành bài thi.
                </Text>
              </Flex>
              <Stack mt={"10px"} mb={"20px"} spacing={"10px"}>
                <Text>Chọn phần thi bạn muốn làm</Text>
                {exam.parts.map((item, index) => {
                  return (
                    <Checkbox
                      onChange={(e) => changePart(e.target.checked, index)}
                    >
                      Part {item.order_in_test} ({item.num_of_questions} câu
                      hỏi)
                    </Checkbox>
                  );
                })}
              </Stack>
              <Text my={"10px"}>Giới hạn thời gian</Text>
              <FormControl my={"10px"}>
                <SelectField
                  options={examDurationOption()}
                  defaultValue={""}
                  onChange={(e) => handleSelectChangeValue(e.target.value)}
                />
              </FormControl>
              {token ? (
                <Flex mt="14px" alignItems={"center"}>
                  <Button
                    _hover={{ background: "blue.800" }}
                    background="blue.600"
                    color="white"
                    onClick={onPractice}
                    isDisabled={disablePractice()}
                  >
                    Luyện tập
                  </Button>
                  {disablePractice() && (
                    <Text ml={"10px"} fontStyle={"italic"}>
                      Bạn cần chọn giới hạn thời gian và ít nhất 1 phần thi để
                      có thể luyện tập
                    </Text>
                  )}
                </Flex>
              ) : (
                <Text ml={"10px"} mt="14px" fontStyle={"italic"}>
                  Bạn cần đăng nhập để có thể luyện tập.
                </Text>
              )}
            </TabPanel>
            <TabPanel className={styles.panel} px={"0px"} pb={"0px"}>
              <Flex
                alignItems={"center"}
                color={"#855a1f"}
                backgroundColor={"#ffefd8"}
                borderColor={"#ffe8c8"}
                p={"10px"}
              >
                <MdErrorOutline />
                <Text pl={"10px"}>
                  Sẵn sàng để bắt đầu làm full test? Để đạt được kết quả tốt
                  nhất, bạn cần dành ra {exam.duration} phút cho bài test này.
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default DetailPanel;
