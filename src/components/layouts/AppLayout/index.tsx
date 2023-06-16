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
} from '@mantine/core';
import { connect } from 'react-redux';

import { NavbarMinimal } from '../../sidebar';
import { logout } from '../../../pages/login/store/actions';

interface Props {
  children?: React.ReactNode;
  logout: () => void;
}

const Index = ({ children, logout }: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
      navbar={<NavbarMinimal />}
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
              justify={{ sm: 'space-between' }}
              style={{ width: '100%' }}
            >
              <Text>Application header</Text>
              <Button variant='outline' onClick={() => logout()}>
                Logout
              </Button>
            </Flex>
          </div>
        </Header>
      }
    >
      <Text>{children}</Text>
    </AppShell>
  );
};

export default connect(null, {
  logout,
})(Index);
