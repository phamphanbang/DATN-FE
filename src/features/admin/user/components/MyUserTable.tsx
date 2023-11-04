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
import { useDeleteUser, useGetUserList } from "api/apiHooks/userHooks";
import { IUserCreateRequest, IUserUpdateRequest, User, UserFilterParams } from "models/user";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EmptyWrapper } from "common/components/EmptyWrapper";
import { useRecoilValue } from "recoil";
import { appConfigState } from "stores/appConfig";
import { Table } from "common/components/Table/Table";
import { PageSize } from "common/components/Table/PageSizeProps";
import { ShowingItemText } from "common/components/Table/ShowItemText";
import { QueryKeys, noOfRows, userRole } from "common/constants";
import { Pagination } from "common/components/Pagination";
import { UserDetailModal } from "./DetailModal";
import { RowAction } from "./RowAction";
import { SelectField } from "common/components/SelectField";
import { TbSearch } from "react-icons/tb";
import useDebounced from "hooks/useDebounced";
import { FaPlus } from "react-icons/fa";
import UserCreateForm from "./UserCreateModal";
import { ModalConfirm } from "common/components/ModalConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "common/components/StandaloneToast";
import UserUpdateForm from "./UserUpdateModal";

const initialFilter: UserFilterParams = {
  maxResultCount: +noOfRows[0].value,
  skipCount: 0,
  sorting: "",
};

export const MyUserTable = () => {
  const { sideBarWidth } = useRecoilValue(appConfigState);
  const [filter, setFilter] = useState<UserFilterParams>(initialFilter);
  const { data, isLoading } = useGetUserList(filter);
  const { items: users = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;

  const [txtSearch, setTxtSearch] = useState<string>("");
  const txtSearchDebounced = useDebounced(txtSearch, 500);

  const [userDetail, setUserDetail] = useState<User>();
  const [isOpenDetails, setOpenDetails] = useState(false);

  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [updateParams, setUpdateParams] = useState<IUserUpdateRequest>({
    name: "",
    avatar: "",
    email: "",
    role: ""
  });

  const [requestId, setRequestId] = useState("");
  const [actionType, setActionType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const deleteRequestMutation = useDeleteUser();
  const queryClient = useQueryClient();

  const onActionViewDetails = (user: User) => () => {
    setUserDetail(user);
    setOpenDetails(true);
  };

  const onActionUpdate = (user: User) => () => {
    setUserId(user.id);
    setUpdateParams({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role
    })
    setIsOpenUpdate(true);
  };

  const columnHelper = createColumnHelper<User>();
  const userColumns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          id: "id",
          header: () => <Box>ID</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: () => <Box>Name</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("role", {
          id: "role",
          header: () => <Box>Role</Box>,
          enableSorting: false,
          cell: (info) => <Box>{info.getValue()}</Box>,
        }),
        columnHelper.accessor("email", {
          id: "email",
          header: () => <Box>Email</Box>,
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
                // onCancel={onAction(info.row.original.id, 'canceled')}
                onDelete={onAction(info.row.original.id, "deleted")}
                onViewDetails={onActionViewDetails(info.row.original)}
                onUpdate={onActionUpdate(info.row.original)}
                // onViewWorkflow={onActionViewWorkflow(info.row.original.id)}
              />
            </Center>
          ),
        }),
      ] as ColumnDef<User>[],
    [columnHelper]
  );

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

  const userRoleOption = useMemo(() => {
    const defaultOptions = {
      value: "",
      label: "All roles",
    };

    const options = userRole.map(({ value, label }) => ({
      value: value,
      label: label,
    }));

    return [defaultOptions, ...options];
  }, []);

  const onFilterChange = useCallback(
    (key: "role" | "search", value?: string) => {
      setFilter((filter) => ({ ...filter, [key]: value, skipCount: 0 }));
    },
    []
  );

  useEffect(() => {
    onFilterChange("search", txtSearchDebounced);
  }, [onFilterChange, txtSearchDebounced]);

  const onAction = (requestId: string, type: "deleted" | "canceled") => () => {
    setRequestId(requestId);
    setActionType(type);
    setModalTitle(`Confirm ${type} user`);
    setModalDescription(`User will be ${type}. Do you confirm that?`);
    setIsOpen(true);
  };

  const handleConfirmation = async () => {
    setIsOpen(false);
    if (requestId.length === 0) return;

    const mutation = deleteRequestMutation;
    const successMessage = "Deleted successfully!";
    const errorMessage =
      actionType === "deleted" ? "Delete failed!" : "Cancel failed!";

    try {
      await mutation.mutateAsync(requestId);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USERS] });
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
          <Box w="220px">
            <SelectField
              size="sm"
              rounded="md"
              onChange={(e) => onFilterChange("role", e.target.value)}
              options={userRoleOption}
            />
          </Box>
          <Box w={"300px"}>
            <InputGroup>
              <Input
                autoFocus
                value={txtSearch}
                type="text"
                placeholder="Enter user name or email"
                fontSize="14px"
                onChange={(e) => setTxtSearch(e.target.value)}
              />
              <InputRightElement width="40px">
                <TbSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w={"200px"} marginLeft={"auto"}>
            <Button w={"100%"} onClick={() => setIsOpenCreate(true)}>
              <FaPlus />
              <p style={{ marginLeft: "5px" }}>Create new user</p>
            </Button>
          </Box>
        </HStack>
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <EmptyWrapper
            isEmpty={!users.length}
            h="200px"
            fontSize="xs"
            message={"No User found!"}
          >
            <Box
              p="20px 30px 0px 24px"
              overflowX="auto"
              w={{ base: `calc(100vw - ${sideBarWidth}px)`, lg: "auto" }}
            >
              <Table
                columns={userColumns}
                data={users}
                // sorting={sorting}
                // onSortingChange={setSorting}
                // onRowClick={onActionViewDetails}
                onRowHover={true}
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
      {userDetail && (
        <UserDetailModal
          isOpen={isOpenDetails}
          onClose={() => setOpenDetails(false)}
          userDetail={userDetail}
        />
      )}
      {isOpenCreate && (
        <UserCreateForm
          isOpen={isOpenCreate}
          onClose={() => setIsOpenCreate(false)}
        />
      )}
      {isOpenUpdate && (
        <UserUpdateForm
          isOpen={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
          userId={userId}
          initialValues={updateParams}
        />
      )}
    </>
  );
};
