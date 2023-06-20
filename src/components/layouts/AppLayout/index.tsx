import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Flex,
  Image,
} from '@mantine/core';
import { connect } from 'react-redux';
import logoImg from '../../../assets/logo.jpg';
import { Navigate, useLocation } from 'react-router-dom';

import { NavbarNested } from '../../sidebar';
import { logout } from '../../../pages/login/store/actions';

interface Props {
  children?: React.ReactNode;
  logout: () => void;
}

const Index = ({ children, logout }: Props) => {
  const theme = useMantineTheme();
  let location = useLocation();

  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    logout();
    <Navigate to={'/login'} state={{ to: null }} />;
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          // minHeight: '95vh',
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={<NavbarNested handleLogout={handleLogout} />}
      // header={
      //   <Header height={{ base: 50, md: 70 }} p='md'>
      //     <div
      //       style={{ display: 'flex', alignItems: 'center', height: '100%' }}
      //     >
      //       <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
      //         <Burger
      //           opened={opened}
      //           onClick={() => setOpened((o) => !o)}
      //           size='sm'
      //           color={theme.colors.gray[6]}
      //           mr='xl'
      //         />
      //       </MediaQuery>

      //       <Flex
      //         direction={{ base: 'column', sm: 'row' }}
      //         gap={{ base: 'sm', sm: 'lg' }}
      //         justify={{ sm: 'space-between' }}
      //         style={{ width: '100%' }}
      //       >
      //         <Image
      //           maw={120}
      //           // mx='auto'
      //           // radius='md'
      //           src={logoImg}
      //           alt='Random image'
      //         />
      //         <Button variant='outline' onClick={handleLogout}>
      //           Logout
      //         </Button>
      //       </Flex>
      //     </div>
      //   </Header>
      // }
    >
      <Text>{children}</Text>
    </AppShell>
  );
};

export default connect(null, {
  logout,
})(Index);
