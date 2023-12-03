import { Flex, Skeleton, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IExamTitle {
  isLoaded: boolean;
  title: string;
  examId: string;
}

const ExamTitle = ({ isLoaded, title, examId }: IExamTitle) => {
  const navigate = useNavigate();
 
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Skeleton minWidth={"100px"} isLoaded={isLoaded}>
        <Text fontSize={"25px"} fontWeight={"700"} p={"8px"}>
          {title}
        </Text>
      </Skeleton>
      <Button
        ml={"10px"}
        border={"1px solid black"}
        backgroundColor={"white"}
        _hover={{
          border: "1px solid #2b6cb0",
          backgroundColor: "#2b6cb0",
          color: "white",
        }}
        onClick={() => navigate('/exams/'+examId)}
      >
        Thoát
      </Button>
    </Flex>
  );
};

export default ExamTitle;
