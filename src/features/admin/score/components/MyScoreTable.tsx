import { Box, Button, Center, HStack, Spinner } from "@chakra-ui/react";
import { UserFilterParams } from "models/user";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EmptyWrapper } from "common/components/EmptyWrapper";
import { useRecoilValue } from "recoil";
import { appConfigState } from "stores/appConfig";
import { Table } from "common/components/Table/Table";
import { FaMinus, FaPlus } from "react-icons/fa";
import ScoreCreateForm from "./ScoreCreateModal";
import { useGetScoreList } from "api/apiHooks/scoreHooks";
import { splitEvenly } from "utils";
import { Score } from "models/score";
import ScoreDeleteForm from "./ScoreDeleteModal";

const initialFilter: UserFilterParams = {
  maxResultCount: 0,
  skipCount: 0,
  sorting: "",
};

export const MyScoreTable = () => {
  const numOfColumns = 3;
  const { sideBarWidth } = useRecoilValue(appConfigState);
  const { data, isLoading } = useGetScoreList(initialFilter);
  const { items: scores = [], totalCount = 0 } = data ?? {};
  const [tableData, setTableData] = useState<Score[][]>();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const splitTableData = () => {
    const tableInfo = splitEvenly(totalCount, numOfColumns);
    let index = 0;
    const result: Score[][] = [];
    tableInfo.forEach((info) => {
      const start = index;
      const end = index + info;
      const part = scores.slice(start, end);
      result.push([...part]);
      index = end;
    });
    return result;
  };

  useEffect(() => {
    setTableData(splitTableData());
  }, [data]);

  const columnHelper = createColumnHelper<Score>();
  const scoreColumns = useMemo(
    () =>
      [
        columnHelper.accessor("questions", {
          id: "questions",
          header: () => <Box>Questions</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("reading_score", {
          id: "reading_score",
          header: () => <Box>Reading Score</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue() ?? "null"}</Box>,
        }),
        columnHelper.accessor("listening_score", {
          id: "listening_score",
          header: () => <Box>Listening Score</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue() ?? "null"}</Box>,
        }),
      ] as ColumnDef<Score>[],
    [columnHelper]
  );

  const renderTable = (data: Score[]) => {
    return (
      <Box
        p="20px 20px 20px 20px"
        overflowX="auto"
        w={{
          base: `calc((100vw - ${sideBarWidth}px)/${numOfColumns})`,
          lg: "auto",
        }}
      >
        <Table columns={scoreColumns} data={data} onRowHover={false} />
      </Box>
    );
  };

  return (
    <>
      <Box>
        <HStack
          w="full"
          pl="24px"
          pr="30px"
          pb="8px"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          <Box w={"250px"} mr={"50px"}>
            <Button w={"100%"} onClick={() => setIsOpenCreate(true)}>
              <FaPlus />
              <p style={{ marginLeft: "5px" }}>Create Or Update Score</p>
            </Button>
          </Box>
          <Box w={"150px"}>
            <Button w={"100%"} onClick={() => setIsOpenDelete(true)}>
              <FaMinus />
              <p style={{ marginLeft: "5px" }}>Delete Score</p>
            </Button>
          </Box>
        </HStack>
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <EmptyWrapper
            isEmpty={!scores.length}
            h="200px"
            fontSize="xs"
            message={"No User found!"}
          >
            <Box display={"flex"}>
              {tableData?.map((item) => renderTable(item))}
            </Box>
          </EmptyWrapper>
        )}
      </Box>
      {isOpenCreate && (
        <ScoreCreateForm
          isOpen={isOpenCreate}
          onClose={() => setIsOpenCreate(false)}
        />
      )}

      {isOpenDelete && (
        <ScoreDeleteForm
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
        />
      )}
    </>
  );
};
