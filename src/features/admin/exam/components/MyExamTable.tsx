import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { EmptyWrapper } from "common/components/EmptyWrapper";
import { useRecoilValue } from "recoil";
import { appConfigState } from "stores/appConfig";
import { Table } from "common/components/Table/Table";
import { PageSize } from "common/components/Table/PageSizeProps";
import { ShowingItemText } from "common/components/Table/ShowItemText";
import { QueryKeys, noOfRows } from "common/constants";
import { Pagination } from "common/components/Pagination";
import { RowAction } from "./RowAction";
import { TbSearch } from "react-icons/tb";
import useDebounced from "hooks/useDebounced";
import { FaPlus } from "react-icons/fa";
import { ModalConfirm } from "common/components/ModalConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import { TableFilterParams } from "models/app";
import { useDeleteTemplate } from "api/apiHooks/templateHook";
import { useGetExamList } from "api/apiHooks/examHook";
import { Exam } from "models/exam";
import { capitalizeFirstLetter } from "utils";
import ExamCreateModal from "./ExamCreateModal";

const initialFilter: TableFilterParams = {
  maxResultCount: +noOfRows[0].value,
  skipCount: 0,
  sorting: ["id", "asc"].join(" "),
};

const initialSorting: SortingState = [
  {
    id: "id",
    desc: false,
  },
];

export const MyExamTable = () => {
  const navigate = useNavigate();

  const { sideBarWidth } = useRecoilValue(appConfigState);
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const { data, isLoading } = useGetExamList(filter);
  const { items: exam = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;

  const [txtSearch, setTxtSearch] = useState<string>("");
  const txtSearchDebounced = useDebounced(txtSearch, 500);

  const [requestId, setRequestId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isDeleteable, setIsDeleteable] = useState(true);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const deleteRequestMutation = useDeleteTemplate();
  const queryClient = useQueryClient();

  const columnHelper = createColumnHelper<Exam>();
  const examColumns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          id: "id",
          header: () => <Box>ID</Box>,
          enableSorting: true,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: () => <Box>Name</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("template.name", {
          id: "template.name",
          header: () => <Box>Template name</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("status", {
          id: "status",
          header: () => <Box>Status</Box>,
          enableSorting: false,
          cell: (info) => <Box>{capitalizeFirstLetter(info.getValue())}</Box>,
        }),
        columnHelper.accessor("total_views", {
          id: "total_views",
          header: () => <Box>Total views</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("comments_count", {
          id: "comments_count",
          header: () => <Box>Total Comments</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.display({
          id: "actions",
          enableSorting: false,
          header: () => <Center w="full">Actions</Center>,
          cell: (info) => (
            <Center onClick={(e) => e.stopPropagation()}>
              <RowAction
                onDelete={onAction(info.row.original.id, "deleted")}
                onUpdate={onActionUpdate(info.row.original.id)}
              />
            </Center>
          ),
        }),
      ] as ColumnDef<Exam>[],
    [columnHelper]
  );

  useEffect(() => {
    const { id, desc } = sorting?.[0] ?? {};
    const sort = `${id} ${desc ? "desc" : "asc"}`;

    setFilter((filter) => ({
      ...filter,
      sorting: sort,
      skipCount: 0,
    }));
  }, [sorting]);

  const onPageChange = (page: number) => {
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setFilter((filter) => ({
      ...filter,
      maxResultCount: pageSize,
      skipCount: 0,
    }));
  };

  const onFilterChange = useCallback((key: "search", value?: string) => {
    setFilter((filter) => ({ ...filter, [key]: value, skipCount: 0 }));
  }, []);

  useEffect(() => {
    onFilterChange("search", txtSearchDebounced);
  }, [onFilterChange, txtSearchDebounced]);

  const onAction = (requestId: string, type: "deleted") => () => {
    setRequestId(requestId);
    setModalTitle(`Confirm ${type} Template`);
    setModalDescription(
      `Template will be ${type} along with all its exams. Do you confirm that?`
    );
    setIsOpen(true);
  };

  const onActionUpdate = (requestId: string) => () => {
    navigate("/admin/templates/update/" + requestId);
  };

  const handleConfirmation = async () => {
    setIsOpen(false);
    if (requestId.length === 0) return;

    const mutation = deleteRequestMutation;
    const successMessage = "Deleted successfully!";
    const errorMessage = "Delete failed!";

    try {
      await mutation.mutateAsync(requestId);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_TEMPLATE] });
      toast({ title: successMessage, status: "success" });
    } catch (error) {
      toast({ title: errorMessage, status: "error" });
    }
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
          <Box w={"300px"}>
            <InputGroup>
              <Input
                autoFocus
                value={txtSearch}
                type="text"
                placeholder="Enter template name"
                fontSize="14px"
                onChange={(e) => setTxtSearch(e.target.value)}
              />
              <InputRightElement width="40px">
                <TbSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w={"240px"} marginLeft={"auto"}>
            <Button w={"100%"} onClick={() => setIsOpenCreate(true)}>
              <FaPlus />
              <p style={{ marginLeft: "5px" }}>Create new exam</p>
            </Button>
          </Box>
        </HStack>
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <EmptyWrapper
            isEmpty={!exam.length}
            h="200px"
            fontSize="xs"
            message={"No Exam found!"}
          >
            <Box
              p="20px 30px 0px 24px"
              overflowX="auto"
              w={{ base: `calc(100vw - ${sideBarWidth}px)`, lg: "auto" }}
            >
              <Table
                columns={examColumns}
                data={exam}
                sorting={sorting}
                onSortingChange={setSorting}
                onRowHover={false}
              />
            </Box>
          </EmptyWrapper>
        )}
        <HStack
          p="20px 30px 20px 30px"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <HStack alignItems="center" spacing="6px" flexWrap="wrap">
            <PageSize noOfRows={noOfRows} onChange={onPageSizeChange} />
            <Spacer w="12px" />
            <ShowingItemText
              skipCount={filter.skipCount}
              maxResultCount={filter.maxResultCount}
              totalCount={totalCount}
            />
          </HStack>
          <Pagination
            total={totalCount}
            pageSize={filter.maxResultCount}
            current={currentPage}
            onChange={onPageChange}
            hideOnSinglePage
          />
        </HStack>
      </Box>
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmation}
        title={modalTitle}
        description={modalDescription}
      />
      {isOpenCreate && (
        <ExamCreateModal
          isOpen={isOpenCreate}
          onClose={() => setIsOpenCreate(false)}
        />
      )}
    </>
  );
};
