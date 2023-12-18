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
    <Flex p={"10px 20px"} my={"10px"} {...props}>
      <Flex>
        <Image
          w={"300px"}
          src={getImage("blogs/" + blog.id, blog.thumbnail)}
          alt="Blog thumbnail"
          mx={"auto"}
          my={"10px"}
        />
      </Flex>
      <Flex flexDirection={'column'} gap={'10px'} w={"75%"} p={"10px"}>
        <NavLink
          to={"/blogs/"+blog.id}
          color={"#1e2022"}
          fontSize={"20px"}
          fontWeight={"600"}
          p={'0px'}
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
