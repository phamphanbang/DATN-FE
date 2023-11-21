import { Box, Flex, Image, Link, Tag, Text, VStack } from "@chakra-ui/react";
import clock from "assets/clock.svg";
import edit from "assets/edit.svg";
import comment from "assets/comment.svg";

const Exam = () => {
  return (
    <VStack
      p="16px"
      borderRadius="15px"
      border="1px solid #e0e0e0"
      maxW="300px"
      background="gray.50"
      justifyContent="space-around"
      boxShadow="0 4px 0 0 rgba(143,156,173,.2)"
      _hover={{
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.2), 0 2px 6px 2px rgba(60,64,67,.15)",
        transform: "translateY(-2px)",
        transition: "all .4s",
      }}
      cursor="pointer"
    >
      <VStack alignItems="start" gap="5px">
        <Box style={{ fontWeight: "700" }}>
          <Text>C18 IELTS reading test 1</Text>
        </Box>

        <VStack fontSize="15px" textColor="#677788" alignItems="start">
          <Box>
            <Text as="span">Bộ đề thi: IELTS C18 Full Test 1</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" alignItems="center" gap="2px">
            <Text as="span">
              <Image src={clock} alt="clock" h="17px" w="17px" />{" "}
            </Text>
            <Text as="span">60 phút | </Text>
            <Text as="span">
              {" "}
              <Text as="span">
                <Image src={edit} alt="clock" h="17px" w="17px" />{" "}
              </Text>
            </Text>
            <Text as="span">419223 | </Text>
            <Text as="span">
              {" "}
              <Text as="span">
                <Image src={comment} alt="clock" h="17px" w="17px" />{" "}
              </Text>
            </Text>
            <Text as="span">1755</Text>
            <Text as="span">4 phần thi | 40 câu hỏi</Text>
          </Box>
        </VStack>

        <Flex alignItems="start" flexWrap="wrap" gap="5px">
          <Tag borderRadius="10px" background="blue.50" textColor="blue.300">
            #IELTS Academic
          </Tag>
          <Tag borderRadius="10px" background="blue.50" textColor="blue.300">
            #Listening
          </Tag>
        </Flex>
      </VStack>

      <Box
        borderRadius="5px"
        alignItems="start"
        display="flex"
        w="100%"
        border="1px solid #63B3ED"
      >
        <Link
          href="#"
          px="12px"
          py="6px"
          w="100%"
          textColor="blue.300"
          fontWeight="700"
          _hover={{
            textDecoration: "none",
            background: "blue.500",
            textColor: "white",
          }}
          textAlign="center"
        >
          Chi tiết
        </Link>
      </Box>
    </VStack>
  );
};

export default Exam;
