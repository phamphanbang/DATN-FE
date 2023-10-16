import { Box, Button, ButtonProps } from '@chakra-ui/react';
import PaginationComponent, {
  PaginationProps as PaginationComponentProps,
} from 'rc-pagination';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

interface PaginationProps extends PaginationComponentProps {
  itemRenderProps?: ButtonProps;
}

type ItemRenderFn = (
  activePage?: number,
  props?: ButtonProps
) => PaginationComponentProps['itemRender'];

export const Pagination = ({
  itemRenderProps,
  current,
  ...paginationProps
}: PaginationProps) => {

  const isLastPage = (activePage: number) => {
    return (
      Math.ceil(
        (paginationProps.total as number) / (paginationProps.pageSize as number)
      ) === activePage
    );
  };

  const ItemRender: ItemRenderFn =
    (activePage, buttonProps) => (current, type) => {
      switch (type) {
        case 'jump-next':
          return (
            <Button
              rounded="sm"
              variant="outline"
              borderRadius="8px"
              size="sm"
              aspectRatio="1/1"
              {...buttonProps}
            >
              <FaAngleDoubleRight />
            </Button>
          );
        case 'jump-prev':
          return (
            <Button
              rounded="sm"
              variant="outline"
              borderRadius="8px"
              size="sm"
              aspectRatio="1/1"
              {...buttonProps}
            >
              <FaAngleDoubleLeft />
            </Button>
          );
        case 'prev':
          return (
            <Button
              rounded="sm"
              variant="outline"
              borderRadius="8px"
              size="sm"
              aspectRatio="1/1"
              {...buttonProps}
              isDisabled={activePage === 1}
            >
              <FaChevronLeft />
            </Button>
          );
        case 'next':
          return (
            <Button
              rounded="sm"
              variant="outline"
              borderRadius="8px"
              size="sm"
              aspectRatio="1/1"
              {...buttonProps}
              isDisabled={isLastPage(activePage as number)}
            >
              <FaChevronRight />
            </Button>
          );
        default:
          return (
            <Button
              rounded="sm"
              variant={activePage === current ? 'solid' : 'outline'}
              // background={activePage === current ? bg : undefined}
              // color={activePage === current ? color : undefined}
              size="sm"
              borderRadius="8px"
              {...buttonProps}
            >
              {current}
            </Button>
          );
      }
    };
  return (
    <Box
      display="flex"
      listStyleType="none"
      gap="12px"
      current={current}
      as={PaginationComponent}
      itemRender={ItemRender(current, itemRenderProps)}
      {...paginationProps}
    />
  );
};
