import {
  Box,
  ChakraProvider,
  HStack,
  Image,
  Link,
  VStack,
} from "@chakra-ui/react";
import banner from "assets/images/banner.webp";
import testBanner from "assets/images/test_trinh_do.webp";
import Exam from "common/usercomponents/Exam";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Course from "common/usercomponents/Course";

const Home = () => {
  const settingsCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of items to show in one slide
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <VStack>
      <Box w="100%">
        <Link href="#" w="100%">
          <Image src={banner} alt="banner" w="100%"  fit='contain'/>
        </Link>
      </Box>

      <Box w="100%" p="10px 10px">
        <Box fontSize="28px" fontWeight="700" mb="12px" textAlign="center">
          Khoá học online nổi bật
        </Box>
        <ChakraProvider>
          <Box maxW="100vw" w={'100%'} >
            <Slider {...settingsCarousel}>
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
            </Slider>
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
          <VStack gap="13px" flexWrap="wrap">
            <HStack gap="13px">
              <Exam />
              <Exam />
              <Exam />
              <Exam />
            </HStack>
            <HStack gap="13px">
              <Exam />
              <Exam />
              <Exam />
              <Exam />
            </HStack>
          </VStack>
        </VStack>
      </Box>


    </VStack>
  );
};

export default Home;
