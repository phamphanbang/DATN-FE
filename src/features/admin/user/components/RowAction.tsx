import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon
} from '@chakra-ui/react';
import { RiSettings4Fill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';

interface RowActionProps {
  onViewDetails: () => void;
  // onCancel: () => void;
  // onDelete: () => void;
}

export const RowAction = ({
  // onCancel,
  // onDelete,
  onViewDetails,
}: RowActionProps) => {

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label=""
        variant="ghost"
        size="sm"
        icon={<Icon color="gray.500" fontSize="lg" as={RiSettings4Fill} />}
      />
      <MenuList minW="100px" >
        <MenuItem
          display="flex"
          gap="12px"
          onClick={onViewDetails}
        >
          <Icon color="gray.500" as={FaEye} />
          View
        </MenuItem>
        {/* <MenuItem  display="flex" gap="12px" onClick={onDelete}>
          <Icon color="gray.500" as={RiDeleteBin6Fill} />
          Delete
        </MenuItem>
        <MenuItem  display="flex" gap="12px" onClick={onCancel}>
          <Icon color="gray.500" as={MdCancel} />
          Cancel
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
};
