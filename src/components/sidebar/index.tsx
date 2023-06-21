import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  Image,
  getStylesRef,
} from '@mantine/core';
import {
  IconNotes,
  IconGauge,
  IconPresentationAnalytics,
  IconLogout,
} from '@tabler/icons-react';
import { UserButton } from '../UserButton';
import { LinksGroup } from '../NavbarLinksGroup';
// import { Logo } from './Logo';
import Logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/' },
  {
    label: 'Admin',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Contracts', link: '/contracts' },
      { label: 'PO', link: '/po' },
      { label: 'Tracking', link: '/tracking' },
    ],
  },
  {
    label: 'Delivery Queue',
    icon: IconPresentationAnalytics,
    link: '/delivery-queue',
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },
  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));

function NavbarNestedBasic({
  handleLogout,
  user,
}: {
  handleLogout: any;
  user: any;
}) {
  const navigate = useNavigate();

  const { classes } = useStyles();
  const handleClick = (event: any, link: any) => {
    console.log(event, link);
    event.preventDefault(event);
    navigate(link);
  };
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={handleClick} />
  ));

  const logout = (event: any) => {
    event.preventDefault();
    handleLogout();
  };

  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
      p='md'
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <Group position='apart'>
          {/* <Logo width={rem(120)} /> */}

          <Image
            maw={120}
            // mx='auto'
            // radius='md'
            src={Logo}
            alt='Random image'
          />
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href='#' className={classes.link} onClick={(event) => logout(event)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <UserButton
          image='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
          name={`${user.First_Name} ${user.Last_Name}`}
          email={user.Employee}
        />
      </Navbar.Section>
    </Navbar>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.getIn(['user', 'user']),
});

export const NavbarNested = connect(mapStateToProps, null)(NavbarNestedBasic);
