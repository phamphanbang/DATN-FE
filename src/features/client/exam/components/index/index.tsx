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
import { useGetExamList, useUserGetExamList } from "api/apiHooks/examHook";
import { Pagination } from "common/components/Pagination";
import { SelectField } from "common/components/SelectField";
import { TextField } from "common/components/TextField";
import { noOfRows } from "common/constants";
import { option } from "common/types";
import { useGetAllTemplateList } from "api/apiHooks/templateHook";
import ExamBox from "common/usercomponents/ExamBox";
import { TableFilterParams } from "models/app";
import { useCallback, useEffect, useState } from "react";
import theme from "themes/theme";
import { EmptyWrapper } from "common/components/EmptyWrapper";

const initialFilter: TableFilterParams = {
  maxResultCount: +noOfRows[0].value,
  skipCount: 0,
  sorting: ["id", "asc"].join(" "),
};

const ExamIndexTable = () => {
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const { data, isLoading } = useUserGetExamList(filter);
  const { data: templateData } = useGetAllTemplateList();
  const { items: exams = [], totalCount = 0 } = data ?? {};
  const { items: templates = [] } = templateData ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;

  const templateOptions = (): option[] => {
    const defaultOption: option = {
      label: "Tất cả bộ đề thi",
      value: "",
    };
    return [defaultOption, ...templates];
  };

  const onPageChange = (page: number) => {
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }));
  };

  const handleSelectChangeValue = (value: string) => {
    const updateFilter = {
      ...filter,
      template_id: value,
    };
    setFilter(updateFilter);
  };

  const onSearch = () => {
    const newFilter = {
      ...filter,
      search: txtSearch,
    };
    setFilter(newFilter);
  };

  return (
    <Flex w={"70%"} backgroundColor={"white"} borderRadius={'10px'} flexDirection={"column"} my={"30px"}>
      {/* Header */}
      <Box p={"30px"} borderBottom={`3px solid ${theme.colors.borderColor}`}>
        <Box fontSize={"30px"} fontWeight={"700"} p={"8px"}>
          Thư viện đề thi
        </Box>
        <Flex mb={"10px"}>
          <FormControl flex={"3"}>
            <TextField
              placeholder="Nhập tên đề thi bạn muỗn tìm kiếm"
              fontSize="sm"
              onChange={(e) => setTxtSearch(e.target.value)}
            />
          </FormControl>
          <FormControl flex={"1"} pl={"10px"}>
            <SelectField
              options={templateOptions()}
              onChange={(e) => handleSelectChangeValue(e.target.value)}
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
          isEmpty={!exams.length}
          h={'100px'}
          w={"100%"}
          fontStyle={'italic'}
          message={"Không có đề thi nào trùng khớp với kết quả tìm kiếm"}
        >
          <SimpleGrid columns={[2, null, 4]} spacing="20px" p={"30px"}>
            {exams.map((item) => (
              <ExamBox exam={item} />
            ))}
          </SimpleGrid>
        </EmptyWrapper>
      )}

      <Pagination
        total={totalCount}
        pageSize={filter.maxResultCount}
        current={currentPage}
        onChange={onPageChange}
        itemRenderProps={{
          padding: "20px 15px",
        }}
        hideOnSinglePage
      />
    </Flex>
  );
};

export default ExamIndexTable;
