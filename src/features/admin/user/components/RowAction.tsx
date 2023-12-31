import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { RiDeleteBin6Fill, RiSettings4Fill } from "react-icons/ri";
import { FaEye, FaSave } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";

interface RowActionProps {
  onViewDetails: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onResetPassword: () => void;
}

export const RowAction = ({
  onUpdate,
  onDelete,
  onViewDetails,
  onResetPassword
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
      <MenuList minW="100px">
        <MenuItem display="flex" gap="12px" onClick={onViewDetails}>
          <Icon color="gray.500" as={FaEye} />
          View
        </MenuItem>
        <MenuItem display="flex" gap="12px" onClick={onUpdate}>
          <Icon color="gray.500" as={FaSave} />
          Update
        </MenuItem>
        <MenuItem display="flex" gap="12px" onClick={onResetPassword}>
          <Icon color="gray.500" as={MdLockReset} />
          Reset Password
        </MenuItem>
        <MenuItem display="flex" gap="12px" onClick={onDelete}>
          <Icon color="gray.500" as={RiDeleteBin6Fill} />
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
