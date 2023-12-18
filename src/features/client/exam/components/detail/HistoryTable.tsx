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
} from "@chakra-ui/react";
import { NavLink } from "common/usercomponents/NavLink";
import { HistoryList, HistoryPart } from "models/exam";

interface IHistoryTable {
  histories: HistoryList[];
  examId: string;
}

const HistoryTable = ({ histories, examId }: IHistoryTable) => {
  const labelBox = (content: string, bg: string) => {
    return (
      <Box
        color={"#fff"}
        backgroundColor={bg}
        borderRadius={"5px"}
        fontSize={"75%"}
        fontWeight={"600"}
        px={'5px'}
        mt={'5px'}
      >
        {content}
      </Box>
    );
  };
  // const renderLabel = (test_type: string, parts: HistoryPart[]) => {
  //   if (test_type === "fulltest") {
  //     return <Flex>{labelBox("Full test", "#3cb46e")}</Flex>;
  //   }
  //   return (
  //     <Flex wrap={'wrap'} gap={'10px'}>
  //       {labelBox("Luyện tập", "#ffad3b")}
  //       {parts.map((i) => {
  //         return labelBox("Part " + i.order_in_test.toString(), "#ffad3b");
  //       })}
  //     </Flex>
  //   );
  // };
  const renderParts = (parts: HistoryPart[]) => {
    return parts.map((i) => {
      return labelBox("Part " + i.order_in_test.toString(), "#ffad3b");
    })
  }

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
        {test_type == "fulltest" ? labelBox("Full test", "#ffad3b") : renderParts(parts)}
        
      </Flex>
    );
  };
  const renderScore = (history: HistoryList) => {
    if (history.test_type === "fulltest") {
      return `(Điểm: ${history.score})`;
    }
    return "";
  };

  return (
    <TableContainer>
      <Table variant="simple" size={'sm'}>
        <Thead>
          <Tr>
            <Th>Ngày làm</Th>
            <Th>Kết quả</Th>
            <Th>Thời gian làm bài</Th>
          </Tr>
        </Thead>
        <Tbody>
          {histories.map((history) => {
            return (
              <Tr>
                <Td>
                  <Text>{history.created_at}</Text>
                  {renderLabel(history.exam_type,history.test_type, history.parts)}
                </Td>
                <Td>
                  {history.right_questions} / {history.total_questions}
                  {renderScore(history)}
                </Td>
                <Td>{history.duration}</Td>
                <Td>
                  <NavLink
                    text="Xem chi tiết"
                    to={"/exams/" + examId + "/history/" + history.id}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
