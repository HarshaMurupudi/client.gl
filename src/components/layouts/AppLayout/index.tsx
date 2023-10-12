import { useState } from "react";
import {
  AppShell,
  Text,
  useMantineTheme,
  LoadingOverlay,
  Header,
  Burger,
  Navbar,
  getStylesRef,
  rem,
  createStyles,
  Image,
  Group,
  Box,
} from "@mantine/core";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";

import { NavbarNested } from "../../sidebar";
import { logout } from "../../../pages/login/store/actions";
import ErrorBoundary from "../../Utils/ErrorBoundary";
import Logo from "../../../assets/logo.png";
import { GLModal } from "../../modal";
import { UserButton } from "../../UserButton";

interface Props {
  children?: React.ReactNode;
  logout: () => void;
  pdfLoading: any;
  user: any;
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
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
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },
  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));

const Index = ({ pdfLoading, children, logout, user }: Props) => {
  const theme = useMantineTheme();
  let location = useLocation();
  const { classes } = useStyles();
  const [mOpened, { open, close }] = useDisclosure(false);

  const [opened, setOpened] = useState(true);

  const handleLogout = () => {
    logout();
    <Navigate to={"/login"} state={{ to: null }} />;
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          minHeight: "100vh",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavbarNested
          width={{ sm: opened ? 200 : 0 }}
          handleLogout={handleLogout}
        />
      }
      header={
        <Header height={50} p="sm">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Burger
                opened={true}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
              <Image maw={220} src={Logo} alt="Random image" />
            </div>

            {user && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <UserButton
                  // image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  name={`${user.First_Name} ${user.Last_Name}`}
                  email={user.Employee}
                />
                <a
                  href="#"
                  className={classes.link}
                  onClick={(event) => logout()}
                >
                  <IconLogout className={classes.linkIcon} stroke={1.5} />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </Header>
      }
    >
      <ErrorBoundary>
        <Text>
          <LoadingOverlay visible={pdfLoading} overlayBlur={2} />
          {children}
        </Text>
        <GLModal opened={mOpened} open={open} close={close} />
      </ErrorBoundary>
    </AppShell>
  );
};

const mapStateToProps = (state) => ({
  pdfLoading: state.getIn(["job", "pdfLoading"]),
  user: state.getIn(["user", "user"]),
});

export default connect(mapStateToProps, {
  logout,
})(Index);
