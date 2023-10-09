import {
  HStack,
  Heading,
  // Image,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
  // Link,
  // Accordion,
  // AccordionButton,
  // AccordionIcon,
  // AccordionItem,
  // AccordionPanel,
  // Box,
  // useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'common/components/SideBar/NavLink';
import {
  TbAppsFilled,
  // TbArticleFilledFilled,
  // TbLayoutBoard,
  // TbBrandMastercard,
  // TbSpeakerphone,
  // TbUserCog,
  // TbHomeEdit,
} from 'react-icons/tb';
import { BiLogOutCircle } from 'react-icons/bi';
import { VscKebabVertical } from 'react-icons/vsc';
// import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
// import Logo from 'assets/images/ncc_logo.svg';
import { useSetAppConfig } from 'stores/appConfig';

export const SideBarContent = () => {
  const NavList = [
    {
      to: '/users',
      text: 'User',
      icon: TbAppsFilled,
    },
  ];

  // const AdminNavList = [
  //   {
  //     to: '/administration',
  //     text: 'Administration',
  //     icon: TbUserCog,
  //     subMenu: [
  //       {
  //         to: '/administration/user-management',
  //         text: 'User management',
  //         icon: TbBrandMastercard,
  //       },
  //       // {
  //       //   to: '/settings',
  //       //   text: 'Settings',
  //       //   icon: TbSettingsBolt,
  //       // },
  //     ],
  //   },
  //   {
  //     to: '/report',
  //     text: 'Report',
  //     icon: TbSpeakerphone,
  //     subMenu: [
  //       {
  //         to: '/report-wfh',
  //         text: 'Report WFH',
  //         icon: TbHomeEdit,
  //       },
  //     ],
  //   },
  // ];

  // const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { onCloseSideBar } = useSetAppConfig();

  const onNavigate = (to: string, logout?: boolean) => () => {
    if (logout) {
      // removeItem(LocalStorageKeys.accessToken);
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
              onClick={onNavigate('/login', true)}
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
