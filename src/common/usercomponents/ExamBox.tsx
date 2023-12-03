import {
  Box,
  BoxProps,
  Flex,
  Image,
  Link,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import clock from "assets/clock.svg";
import edit from "assets/edit.svg";
import comment from "assets/comment.svg";
import { Exam } from "models/exam";
import { NavLink } from "./NavLink";

interface IExamProps extends BoxProps {
  exam: Exam;
}

const ExamBox = ({exam, ...props }: IExamProps) => {
  return (
    <VStack
      p="16px"
      borderRadius="15px"
      border="1px solid #e0e0e0"
      maxW="300px"
      background="gray.50"
      justifyContent="space-between"
      boxShadow="0 4px 0 0 rgba(143,156,173,.2)"
      _hover={{
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.2), 0 2px 6px 2px rgba(60,64,67,.15)",
        transform: "translateY(-5px)",
        transition: "all .4s",
      }}
      cursor="pointer"
      {...props}
    >
      <VStack maxW={'100%'} alignItems="start" gap="5px">
        <Box style={{ fontWeight: "700" }}>
          <Text>{exam.name}</Text>
        </Box>

        <VStack maxW={'100%'} fontSize="15px" textColor="#677788" alignItems="start">
          <Box maxW={'100%'}>
            <Text as="span">Bộ đề thi: {exam.template.name}</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" alignItems="center" gap="2px">
            <Flex alignItems={'center'} as="span">
              <Image src={clock} alt="clock" h="17px" w="17px" />
              <Text ml={'5px'} as="span" textOverflow={'clip'}>{exam.template.duration} phút | </Text>
            </Flex>

            <Flex alignItems={'center'} as="span">
              <Image src={edit} alt="clock" h="17px" w="17px" />{" "}
              <Text ml={'5px'} as="span">{exam.total_views} | </Text>
            </Flex>

            <Flex alignItems={'center'} as="span">
              <Image src={comment} alt="clock" h="17px" w="17px" />{" "}
              <Text ml={'5px'} as="span">{exam.comments_count}</Text>
            </Flex>

            <Text as="span">{exam.template.total_parts} phần thi | {exam.template.total_questions} câu hỏi</Text>
          </Box>
        </VStack>
      </VStack>

      <Box
        borderRadius="5px"
        alignItems="start"
        display="flex"
        w="100%"
        border="1px solid #2a4365"
      >
        <NavLink
          to={"/exams/"+exam.id}
          px="12px"
          py="6px"
          w="100%"
          textColor="blue.600"
          fontWeight="700"
          _hover={{
            textDecoration: "none",
            background: "blue.800",
            textColor: "white",
          }}
          textAlign="center"
          text="Chi tiết"
        />
      </Box>
    </VStack>
  );
};

export default ExamBox;
