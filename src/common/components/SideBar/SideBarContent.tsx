import {
  HStack,
  Heading,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { NavLink } from 'common/components/SideBar/NavLink';
import {
  TbAppsFilled,
} from 'react-icons/tb';
import { BiLogOutCircle } from 'react-icons/bi';
import { VscKebabVertical } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSetAppConfig } from 'stores/appConfig';
import { removeItem } from 'utils';
import { LocalStorageKeys } from 'common/enums';

export const SideBarContent = () => {
  const NavList = [
    {
      to: '/admin/users',
      text: 'User',
      icon: TbAppsFilled,
    },
    {
      to: '/admin/templates',
      text: 'Templates',
      icon: TbAppsFilled,
    },
    {
      to: '/admin/exams',
      text: 'Exams',
      icon: TbAppsFilled,
    },
    {
      to: '/admin/blogs',
      text: 'Blogs',
      icon: TbAppsFilled,
    },
    {
      to: '/admin/scores',
      text: 'Scores',
      icon: TbAppsFilled,
    },
  ];

  // const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { onCloseSideBar } = useSetAppConfig();

  const onNavigate = (to: string, logout?: boolean) => () => {
    if (logout) {
      removeItem(LocalStorageKeys.accessToken);
    }
    navigate(to);
  };

  return (
    <VStack bg="dark" color="white" h="100vh" alignItems="stretch" spacing={0}>
      <HStack
        cursor="pointer"
        alignItems="center"
        py="20px"
        px="16px"
        spacing="12px"
        onClick={onNavigate('/')}
      >
        {/* <Image h="40px" src={Logo} /> */}
        <Heading fontSize="18px">TOEICAMP</Heading>
      </HStack>
      <VStack
        p="12px"
        align="flex-start"
        spacing="4px"
        overflowY="auto"
        flex={1}
        sx={{
          '&::-webkit-scrollbar': {
            width: '0',
          },
        }}
      >
        {NavList.map((nav) => (
          <NavLink key={nav.to} {...nav} onClick={onCloseSideBar} />
        ))}
      </VStack>
      <HStack borderTopColor="gray.200" px="12px" py="16px" spacing="12px">
        <Text fontSize="sm" fontWeight={600} noOfLines={1}>
          {/* {user.email} */}
          PlaceHolder
        </Text>
        <Menu autoSelect={false} placement="top-end" >
          <MenuButton
            ml="auto"
            as={IconButton}
            variant="ghost"
            size="sm"
            icon={<Icon as={VscKebabVertical}
            color="gray"
            />}
            _hover={{
              backgroundColor: "gray.800"
            }}
            _active={{
              backgroundColor: "gray.800"
            }}
          />
          <MenuList bg="dark" minW="140px" border="none">
            {/* <MenuItem
              color={color}
              display="flex"
              gap="12px"
              onClick={onNavigate('/my-profile')}
            >
              <Icon as={HiUser} fontSize="xl" color="gray.500" />
              <Text fontSize="sm">My profile</Text>
            </MenuItem> */}
            <MenuItem
              color="white"
              display="flex"
              gap="12px"
              bg="dark"
              onClick={onNavigate('/admin/login', true)}
              _hover={{
                backgroundColor: "gray.800"
              }}
            >
              <Icon as={BiLogOutCircle} fontSize="xl" color="gray.500" />
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};
