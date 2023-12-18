import { Box, Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import { NavLink } from "common/usercomponents/NavLink";
import { UserBlog } from "models/blog";
import { FaComments } from "react-icons/fa";
import { getImage } from "utils";

interface IBlogItemProps extends FlexProps {
  blog: UserBlog;
}

const BlogItem = ({ blog, ...props }: IBlogItemProps) => {
  return (
    <Flex
      my={"10px"}
      borderRadius="15px"
      border="1px solid #e0e0e0"
      maxW="300px"
      background="gray.50"
      flexDirection={"column"}
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
      <Flex w={'100%'} borderTopRadius={'10px'}>
        <Image
          w={"100%"}
          src={getImage("blogs/" + blog.id, blog.thumbnail)}
          alt="Blog thumbnail"
          mx={"auto"}
          borderTopRadius={'10px'}
          // my={"10px"}
        />
      </Flex>
      <Flex flexDirection={"column"} gap={"10px"} p={"10px"}>
        <NavLink
        
          to={"/blogs/" + blog.id}
          color={"#1e2022"}
          fontSize={"20px"}
          fontWeight={"600"}
          p={"0px"}
          text={blog.name}
        />
        <Text
          display={"-webkit-box"}
          overflow={"hidden"}
          style={{
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {blog.description}
        </Text>
        <Flex>
          <Text>Ngày đăng : {blog.created_at} </Text>
          {blog.comments_count > 0 && (
            <Flex gap={"10px"}>
              <Text>|</Text>
              <FaComments />
              <Text>{blog.comments_count} bình luận</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogItem;
