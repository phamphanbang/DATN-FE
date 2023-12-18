import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Pagination } from "common/components/Pagination";
import { TextField } from "common/components/TextField";
import { noOfRows } from "common/constants";
import { TableFilterParams } from "models/app";
import { useCallback, useEffect, useState } from "react";
import theme from "themes/theme";
import { EmptyWrapper } from "common/components/EmptyWrapper";
import { useUserGetBlogList } from "api/apiHooks/blogHooks";
import { useSearchParams } from "react-router-dom";
import BlogItem from "../component/BlogItem";

interface IBlogsProps {
  page?: string;
  search?: string;
}

const BlogIndexTable = ({ page, search }: IBlogsProps) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const initialFilter: TableFilterParams = {
    maxResultCount: +noOfRows[0].value,
    skipCount: 0,
    sorting: ["id", "asc"].join(" "),
    search: search ?? "",
  };
  const [txtSearch, setTxtSearch] = useState<string>(search ?? "");
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const { data, isLoading } = useUserGetBlogList(filter);
  const { items: blogs = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = () => {
    if (page) return parseInt(page);
    return (maxResultCount + skipCount) / maxResultCount;
  };

  const onPageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { replace: true });
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }));
  };

  const onSearch = () => {
    searchParams.set("search", txtSearch);
    setSearchParams(searchParams, { replace: true });
    const newFilter = {
      ...filter,
      search: txtSearch,
    };
    setFilter(newFilter);
  };

  return (
    <Flex
      w={"50%"}
      backgroundColor={"white"}
      borderRadius={"10px"}
      border={`1px solid #c7c7c7`}
      flexDirection={"column"}
      my={"30px"}
    >
      {/* Header */}
      <Box p={"30px"} borderBottom={`1px solid #c7c7c7`}>
        <Box fontSize={"30px"} fontWeight={"700"} p={"8px"}>
          Bài viết
        </Box>
        <Flex mb={"10px"}>
          <FormControl flex={"3"}>
            <TextField
              placeholder="Nhập tên bài viết mà bạn muỗn tìm kiếm"
              fontSize="sm"
              onChange={(e) => setTxtSearch(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Button
          color="white"
          background="blue.600"
          _hover={{ textDecoration: "none", background: "blue.800" }}
          onClick={onSearch}
        >
          Tìm kiếm
        </Button>
      </Box>
      {isLoading ? (
        <Center h="200px">
          <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
        </Center>
      ) : (
        <EmptyWrapper
          isEmpty={!blogs.length}
          h={"100px"}
          w={"100%"}
          fontStyle={"italic"}
          message={"Không có blog nào trùng khớp với kết quả tìm kiếm"}
        >
          {/* <SimpleGrid columns={[2, null, 4]} spacing="20px" p={"30px"}>
              {blogs.map((item) => (
                <BlogItem blog={item} key={"blogs_"+item.id}/>
              ))}
            </SimpleGrid> */}
          <Flex flexDirection={'column'} gap={'20px'}>
            {blogs.map((item) => (
              <BlogItem blog={item} key={"blogs_" + item.id} />
            ))}
          </Flex>
        </EmptyWrapper>
      )}

      <Pagination
        total={totalCount}
        pageSize={filter.maxResultCount}
        current={currentPage()}
        onChange={onPageChange}
        itemRenderProps={{
          padding: "20px 15px",
        }}
        hideOnSinglePage
      />
    </Flex>
  );
};

export default BlogIndexTable;
