import {
  Box,
  Card,
  CardBody,
  Image,
  Tag,
  VStack,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";
import CoursePic from "assets/images/course.webp";

const Course = () => {
  return (
    <Box padding="10px">
      <Card
        _hover={{
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.2), 0 2px 6px 2px rgba(60,64,67,.15)",
          transform: "translateY(-2px)",
          transition: "all .4s",
        }}
      >
        <CardBody justifyContent="start">
          <Link
            href="#"
            _hover={{
              textDecoration: "none",
            }}
          >
            <VStack fontSize="15px" alignItems="start">
              <Image src={CoursePic} alt="course" />
              <Box p="8px 16px 4px">
                [Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện
                nghe với Dictation [Tặng khoá TED Talks]
              </Box>
              <Box p="0 16px">
                <Tag
                  background="blue.50"
                  textColor="blue.300"
                  borderRadius="15px"
                >
                  #Khoá học online
                </Tag>
              </Box>
              <HStack p="0 16px">
                <Text textColor="green" fontWeight="700" fontSize="16px">
                  989.000đ
                </Text>
                <Text as="s">1.800.000đ</Text>
                <Tag textColor="white" background="red">
                  -45%
                </Tag>
              </HStack>
            </VStack>
          </Link>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Course;
