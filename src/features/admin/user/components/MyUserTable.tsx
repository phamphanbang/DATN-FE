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
} from '@chakra-ui/react';
import { useGetUserList } from "api/apiHooks/userHooks";
import { User, UserFilterParams } from "models/user";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EmptyWrapper } from 'common/components/EmptyWrapper';
import { useRecoilValue } from 'recoil';
import { appConfigState } from 'stores/appConfig';
import { Table } from 'common/components/Table/Table';
import { PageSize } from 'common/components/Table/PageSizeProps';
import { ShowingItemText } from 'common/components/Table/ShowItemText';
import { noOfRows, userRole } from 'common/constants';
import { Pagination } from 'common/components/Pagination';
import { UserDetailModal } from './DetailModal';
import { RowAction } from './RowAction';
import { SelectField } from 'common/components/SelectField';
import { TbSearch } from 'react-icons/tb';
import useDebounced from 'hooks/useDebounced';
import { FaPlus } from 'react-icons/fa';
import UserCreateForm from './UserCreateModal';


const initialFilter: UserFilterParams = {
  maxResultCount: +noOfRows[0].value,
  skipCount: 0,
  sorting: ""
}

export const MyUserTable = () => {
  const { sideBarWidth } = useRecoilValue(appConfigState);
  const [filter, setFilter] = useState<UserFilterParams>(initialFilter);
  const { data, isLoading } = useGetUserList(filter);
  const { items: users = [], totalCount = 0 } = data ?? {};
  const { skipCount, maxResultCount } = filter;
  const currentPage = (maxResultCount + skipCount) / maxResultCount;

  const [txtSearch, setTxtSearch] = useState<string>('');
  const txtSearchDebounced = useDebounced(txtSearch, 500);

  const [userDetail, setUserDetail] = useState<User>();
  const [isOpenDetails, setOpenDetails] = useState(false);

  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const onActionViewDetails = (user: User) => () => {
    setUserDetail(user);
    setOpenDetails(true);
  };

  const columnHelper = createColumnHelper<User>();
  const userColumns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: 'id',
        header: () => <Box>ID</Box>,
        enableSorting: false,
        cell: (info) => <Box>{info.getValue()}</Box>
      }),
      columnHelper.accessor("name", {
        id: 'name',
        header: () => <Box>Name</Box>,
        enableSorting: false,
        cell: (info) => <Box>{info.getValue()}</Box>
      }),
      columnHelper.accessor("role", {
        id: 'role',
        header: () => <Box>Role</Box>,
        enableSorting: false,
        cell: (info) => <Box>{info.getValue()}</Box>
      }),
      columnHelper.accessor("email", {
        id: 'email',
        header: () => <Box>Email</Box>,
        enableSorting: false,
        cell: (info) => <Box>{info.getValue()}</Box>
      }),
      columnHelper.display({
        id: 'actions',
        enableSorting: false,
        header: () => <Center w="full">Actions</Center>,
        cell: (info) => (
          <Center onClick={(e) => e.stopPropagation()}>
            <RowAction
              // onCancel={onAction(info.row.original.id, 'canceled')}
              // onDelete={onAction(info.row.original.id, 'deleted')}
              onViewDetails={onActionViewDetails(info.row.original)}
            // onViewWorkflow={onActionViewWorkflow(info.row.original.id)}
            />
          </Center>
        )
      })
    ] as ColumnDef<User>[]
    , [columnHelper]
  );

  const onPageChange = (page: number) => {
    setFilter((filter) => ({
      ...filter,
      skipCount: filter.maxResultCount * (page - 1),
    }))
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
      value: '',
      label: 'All roles',
    };

    const options = userRole.map(({ value, label }) => ({
      value: value,
      label: label,
    }));

    return [defaultOptions, ...options];
  }, []);

  const onFilterChange = useCallback(
    (
      key:
        | 'role'
        | 'search',
      value?: string
    ) => {
      setFilter((filter) => ({ ...filter, [key]: value, skipCount: 0 }));
    },
    []
  );

  useEffect(() => {
    onFilterChange('search', txtSearchDebounced);
  }, [onFilterChange, txtSearchDebounced]);

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
              onChange={(e) =>
                onFilterChange('role', e.target.value)
              }
              options={userRoleOption}
            />
          </Box>
          <Box w={'300px'}>
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
          <Box w={'200px'} marginLeft={'auto'}>
            <Button w={'100%'}
              onClick={() => setIsOpenCreate(true)}
            >
              <FaPlus />
              <p style={{ marginLeft: '5px' }}>Create new user</p>
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
            message={'No User found!'}
          >
            <Box
              p="20px 30px 0px 24px"
              overflowX="auto"
              w={{ base: `calc(100vw - ${sideBarWidth}px)`, lg: 'auto' }}
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

    </>
  );
}