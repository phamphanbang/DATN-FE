import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Box,
  Flex,
  filter,
  Center,
  Spinner,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { SelectField } from "common/components/SelectField";
import { useGetHistoryList } from "api/apiHooks/examHook";
import { EmptyWrapper } from "common/components/EmptyWrapper";
import { Pagination } from "common/components/Pagination";
import { historyTime, noOfRows, userExamType } from "common/constants";
import { option } from "common/types";
import { NavLink } from "common/usercomponents/NavLink";
import { TableFilterParams } from "models/app";
import { HistoryList, HistoryListIndex, HistoryPart } from "models/exam";
import { useState } from "react";
import { BiBullseye } from "react-icons/bi";
import { FaBookOpen, FaClock, FaAssistiveListeningSystems, FaBookReader } from "react-icons/fa";

interface IHistoryPanel {
  userId: string;
}

const HistoryPanel = ({ userId }: IHistoryPanel) => {
  const initialFilter: TableFilterParams = {
    maxResultCount: +noOfRows[0].value,
    skipCount: 0,
    sorting: ["id", "asc"].join(" "),
    time: 30,
  };
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const [examType, setExamType] = useState<string>("");
  const { data, isLoading } = useGetHistoryList(userId, filter);
  const { items: histories = [], totalCount = 0, stat } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;
  const [time, setTime] = useState<number>(30);

  const onPageChange = (page: number) => {
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }));
  };

  const labelBox = (content: string, bg: string) => {
    return (
      <Box
        color={"#fff"}
        backgroundColor={bg}
        borderRadius={"5px"}
        fontSize={"75%"}
        fontWeight={"600"}
        px={"5px"}
        mt={"5px"}
      >
        {content}
      </Box>
    );
  };
  const renderParts = (parts: HistoryPart[]) => {
    return parts.map((i) => {
      return labelBox("Part " + i.order_in_test.toString(), "#ffad3b");
    });
  };

  const renderLabel = (
    exam_type: string,
    test_type: string,
    parts: HistoryPart[]
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
  const renderScore = (history: HistoryListIndex) => {
    if (history.test_type === "fulltest") {
      return `(Điểm: ${history.score})`;
    }
    return "";
  };

  const onSearch = () => {
    const newFilter = {
      ...filter,
      time: time,
    };
    setFilter(newFilter);
  };
  const hítoryFilterOption = (): option[] => {
    const defaultOption: option = {
      label: "Tất cả",
      value: "",
    };
    return [defaultOption, ...historyTime];
  };
  const handleSelectChangeType = (value: string) => {
    setTime(parseInt(value));
  };

  return (
    <Box>
      <Text pl={"10px"} mb={"10px"} color={"#e43a45"} fontStyle={"italic"}>
        Chú ý: Mặc định trang thống kê sẽ hiển thị các bài làm trong khoảng thời
        gian 30 ngày gần nhất, để xem kết quả trong khoảng thời gian xa hơn bạn
        chọn ở phần dropdown dưới đây.
      </Text>
      <Text pl={"10px"} mb={"10px"}>
        Lọc kết quả bài thi theo ngày :
      </Text>
      <Flex gap={"10px"} mb={"20px"}>
        <FormControl w={"350px"} pl={"10px"}>
          <SelectField
            options={hítoryFilterOption()}
            onChange={(e) => handleSelectChangeType(e.target.value)}
            defaultValue={time}
          />
        </FormControl>
        <Button
          color="white"
          background="blue.600"
          _hover={{ textDecoration: "none", background: "blue.800" }}
          onClick={onSearch}
        >
          Tìm kiếm
        </Button>
      </Flex>
      {(stat && histories.length)  ? (
        <Flex justifyContent={"space-between"} px={"10px"} gap={"10px"} mb={'20px'}>
          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#677788"} fontSize={"25px"}>
              <FaBookOpen />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#677788"}
              w={"100%"}
              textAlign={"center"}
            >
              Số đề đã làm
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {stat?.number_of_test}
            </Text>
            <Text w={"100%"} textAlign={"center"}>
              đề thi
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#677788"} fontSize={"25px"}>
              <FaClock />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#677788"}
              w={"100%"}
              textAlign={"center"}
            >
              Thời gian luyện thi
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {stat?.total_duration}
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#677788"} fontSize={"25px"}>
              <BiBullseye />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#677788"}
              w={"100%"}
              textAlign={"center"}
            >
              Độ chính xác (#đúng/#tổng)
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {(
                ((stat?.listening_right_questions +
                  stat.reading_right_questions) /
                  (stat?.listening_total_questions +
                    stat.reading_total_questions)) *
                100
              ).toFixed(2) + "%"}
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#677788"} fontSize={"25px"}>
              <FaAssistiveListeningSystems />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#677788"}
              w={"100%"}
              textAlign={"center"}
            >
              Độ chính xác listening (#đúng/#tổng)
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {(
                (stat?.listening_right_questions /
                  stat?.listening_total_questions) *
                100
              ).toFixed(2) + "%"}
            </Text>
          </Flex>

          <Flex
            flex={1}
            p={"15px 5px"}
            border={"1px solid #d5d5d5"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"center"} color={"#677788"} fontSize={"25px"}>
              <FaBookReader />
            </Flex>
            <Text
              fontSize={"20px"}
              fontWeight={"500"}
              color={"#677788"}
              w={"100%"}
              textAlign={"center"}
            >
              Độ chính xác reading (#đúng/#tổng)
            </Text>
            <Text
              fontSize={"20px"}
              fontWeight={"600"}
              w={"100%"}
              textAlign={"center"}
            >
              {(
                (stat?.listening_right_questions /
                  stat?.listening_total_questions) *
                100
              ).toFixed(2) + "%"}
            </Text>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
      <Text fontWeight={'600'} mb={'20px'}>Danh sách đề thi đã làm:</Text>
      {isLoading ? (
        <Center h="200px">
          <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
        </Center>
      ) : (
        <>
          <EmptyWrapper
            isEmpty={!histories.length}
            h={"100px"}
            w={"100%"}
            fontStyle={"italic"}
            message={"Bạn chưa làm đề thi nào cả"}
          >
            {/* {histories.map((history) => {
            return (
              <Flex>
                <Box>
                  <Text>{history.created_at}</Text>
                  {renderLabel(history.test_type, history.parts)}
                </Box>
                <Box>
                  {history.right_questions} / {history.total_questions}
                  {renderScore(history)}
                </Box>
                <Box>{history.duration}</Box>
                <Box>
                  <NavLink
                    text="Xem chi tiết"
                    to={"/exams/" + history.exam_id + "/history/" + history.id}
                  />
                </Box>
              </Flex>
            );
          })} */}

            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Ngày làm</Th>
                    <Th>Đề thi</Th>
                    <Th>Kết quả</Th>
                    <Th>Thời gian làm bài</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {histories.map((history) => {
                    return (
                      <Tr>
                        <Td verticalAlign={"top"}>
                          <Text>{history.created_at}</Text>
                        </Td>
                        <Td>
                          <Text>{history.test.name}</Text>
                          {renderLabel(
                            history.exam_type,
                            history.test_type,
                            history.parts
                          )}
                        </Td>
                        <Td verticalAlign={"top"}>
                          {history.right_questions} / {history.total_questions}
                          {renderScore(history)}
                        </Td>
                        <Td verticalAlign={"top"}>{history.duration}</Td>
                        <Td verticalAlign={"top"}>
                          <NavLink
                            text="Xem chi tiết"
                            to={
                              "/exams/" +
                              history.exam_id +
                              "/history/" +
                              history.id
                            }
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </EmptyWrapper>
        </>
      )}
      <Pagination
        total={totalCount}
        pageSize={filter.maxResultCount}
        current={currentPage}
        onChange={onPageChange}
        itemRenderProps={{
          padding: "20px 15px",
        }}
        hideOnSinglePage
      />
    </Box>
  );
};

export default HistoryPanel;
