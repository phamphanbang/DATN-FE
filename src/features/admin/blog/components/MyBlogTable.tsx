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
  Image,
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
import { useDeleteBlog, useGetBlogList } from "api/apiHooks/blogHooks";
import { TableFilterParams } from "models/app";
import { Blog } from "models/blog";
import { getImage } from "utils";

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

export const MyBlogTable = () => {
  const navigate = useNavigate();

  const { sideBarWidth } = useRecoilValue(appConfigState);
  const [filter, setFilter] = useState<TableFilterParams>(initialFilter);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const { data, isLoading } = useGetBlogList(filter);
  const { items: blogs = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;

  const [txtSearch, setTxtSearch] = useState<string>("");
  const txtSearchDebounced = useDebounced(txtSearch, 500);

  const [requestId, setRequestId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const deleteRequestMutation = useDeleteBlog();
  const queryClient = useQueryClient();

  const columnHelper = createColumnHelper<Blog>();
  const blogColumns = useMemo(
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
        columnHelper.accessor("thumbnail", {
          id: "thumbnail",
          header: () => <Box>Thumbnail</Box>,
          enableSorting: false,
          cell: (info) => (
            <Box>
              <Image
                boxSize="50px"
                src={getImage("blogs/" + info.row.original.id, info.getValue())}
                alt="Blog Thumbnail"
                mx={"auto"}
                my={"10px"}
              />
            </Box>
          ),
        }),
        // columnHelper.accessor("panel", {
        //   id: "panel",
        //   header: () => <Box>Panel</Box>,
        //   enableSorting: false,
        //   cell: (info) => (
        //     <Box>
        //       <Image
        //         boxSize="50px"
        //         src={getImage("blogs" + info.row.original.id, info.getValue())}
        //         alt="Blog Panel"
        //         mx={"auto"}
        //         my={"10px"}
        //       />
        //     </Box>
        //   ),
        // }),
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
      ] as ColumnDef<Blog>[],
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
    setModalTitle(`Confirm ${type} blog`);
    setModalDescription(`Blog will be ${type}. Do you confirm that?`);
    setIsOpen(true);
  };

  const onActionUpdate = (requestId: string) => () => {
    navigate("/admin/blogs/update/" + requestId);
  };

  const handleConfirmation = async () => {
    setIsOpen(false);
    if (requestId.length === 0) return;

    const mutation = deleteRequestMutation;
    const successMessage = "Deleted successfully!";
    const errorMessage = "Delete failed!";

    try {
      await mutation.mutateAsync(requestId);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_BLOGS] });
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
                placeholder="Enter blog name"
                fontSize="14px"
                onChange={(e) => setTxtSearch(e.target.value)}
              />
              <InputRightElement width="40px">
                <TbSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w={"200px"} marginLeft={"auto"}>
            <Button w={"100%"} onClick={() => navigate("/admin/blogs/create")}>
              <FaPlus />
              <p style={{ marginLeft: "5px" }}>Create new blog</p>
            </Button>
          </Box>
        </HStack>
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <EmptyWrapper
            isEmpty={!blogs.length}
            h="200px"
            fontSize="xs"
            message={"No Blog found!"}
          >
            <Box
              p="20px 30px 0px 24px"
              overflowX="auto"
              w={{ base: `calc(100vw - ${sideBarWidth}px)`, lg: "auto" }}
            >
              <Table
                columns={blogColumns}
                data={blogs}
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
    </>
  );
};
