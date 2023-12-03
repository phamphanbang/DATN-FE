import {
  Box,
  Center,
  ChakraProvider,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import banner from "assets/images/banner.webp";
import testBanner from "assets/images/test_trinh_do.webp";
import Exam from "common/usercomponents/ExamBox";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Course from "common/usercomponents/Course";
import { useGetHomepage } from "api/apiHooks/homeHooks";
import ExamBox from "common/usercomponents/ExamBox";
import { useEffect } from "react";
import { EmptyWrapper } from "common/components/EmptyWrapper";

const Home = () => {
  // const settingsCarousel = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3, // Number of items to show in one slide
  //   slidesToScroll: 1,
  //   arrows: false,
  // };

  const { data, isLoading } = useGetHomepage();
  const { exams = [] } = data ?? {};

  return (
    <VStack>
      <Box w="100%">
        <Link href="#" w="100%">
          <Image src={banner} alt="banner" w="100%" fit="contain" />
        </Link>
      </Box>

      <Box w="100%" p="10px 10px">
        <Box fontSize="28px" fontWeight="700" mb="12px" textAlign="center">
          Khoá học online nổi bật
        </Box>
        <ChakraProvider>
          <Box maxW="100vw" w={"100%"}>
            {/* <Slider {...settingsCarousel}>
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
            </Slider> */}
          </Box>
        </ChakraProvider>
      </Box>

      <Box px="12px" py="32px">
        <Link href="#">
          <Image src={testBanner} alt="banner" />
        </Link>
      </Box>

      <Box px="12px" py="32px">
        <VStack>
          <Box fontSize="28px" fontWeight="700" mb="12px">
            Đề thi mới nhất
          </Box>
          {isLoading ? (
            <Center h="200px">
              <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
            </Center>
          ) : (
            <EmptyWrapper
              isEmpty={!exams.length}
              h={"100px"}
              w={"100%"}
              fontStyle={"italic"}
              message={"Không có đề thi nào trong hệ thống"}
            >
              <SimpleGrid columns={[2, null, 4]} spacing="20px" p={"30px"}>
                {exams.map((item) => (
                  <ExamBox exam={item} />
                ))}
              </SimpleGrid>
            </EmptyWrapper>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default Home;
