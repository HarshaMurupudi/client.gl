import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  Image,
  getStylesRef,
} from "@mantine/core";
import {
  IconNotes,
  IconGauge,
  IconPresentationAnalytics,
  IconLogout,
  IconFileAnalytics,
  IconCalendarStats,
  IconFingerprint,
} from "@tabler/icons-react";

import { UserButton } from "../UserButton";
import { LinksGroup } from "../NavbarLinksGroup";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Admin",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Job Review", link: "/contracts" },
      { label: "PO Review", link: "/po" },
      { label: "Tracking", link: "/tracking" },
      { label: "Attendance", link: "/attendance" },
      //{ label: "Production Meeting", link: "/productionMeeting" },
    ],
  },
  {
    label: "Job Planning",
    icon: IconFileAnalytics,
    initiallyOpened: false,
    links: [{ label: "Pending", link: "/pending-jobs" }],
  },
  {
    label: "Engineering",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "A-ART", link: "/a-art" },
      { label: "QC", link: "/qc" },
      { label: "A-CUSTOMER", link: "/a-customer" },
      { label: "HYTECH", link: "/hytech"},
      { label: "ECO", link: "/eco"},
      { label: "FAI", link: "/fai"},
    ],
  },
  {
    label: "Print",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "D-SCREENS", link: "/d-screens" },
      { label: "E-INK", link: "/e-ink" },
      { label: "H-CYLINDER", link: "/h-cylinder" },
      { label: "H-SS SEMI", link: "/h-ss-semi" },
      { label: "K-DESPATCH", link: "/k-despatch" },
    ],
  },
  {
    label: "Material",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [{ label: "F-MATERIAL", link: "/f-material" }],
  },
  {
    label: "Digital Printing",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "H-JETRION", link: "/h-jetrion" },
      { label: "I-CANON", link: "/i-canon" },
      { label: "I-INDIGO", link: "/i-indigo" },
    ],
  },
  {
    label: "Rolt",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "H-Rolt fin", link: "/h-rolt-fin" },
      { label: "H-ROLT", link: "/h-rolt" },
      { label: "ROCKWAY", link: "/rockway" },
    ],
  },
  {
    label: "Converting",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "L-REWIND", link: "/l-rewind" },
      { label: "O-ZUNDPLOT", link: "/o-zundplot" },
      { label: "P-DIECUT", link: "/p-diecut" },
      { label: "P-DMOD01", link: "/p-dmod01" },
      { label: "Q-WS400XY", link: "/q-ws400xy" },
    ],
  },
  {
    label: "Circuit Department",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "SPARTANICS", link: "/spartanics" },
      { label: "V-PICKPLAC", link: "/v-pickplac" },
      { label: "W-MEMBRANE", link: "/w-membrane" },
      { label: "W-STAGE", link: "/w-stage" },
    ],
  },
  {
    label: "LAM",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "N-LAM", link: "/n-lam" },
    ],
  },
  {
    label: "Shipping",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [{ label: "Z-SHIP", link: "/z-ship" }],
  },
  {
    label: "Obsolete",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "Cir_ASMBLY", link: "/cir-asmbly" },
      { label: "H Sakurai 2", link: "/h-sakurai-2" },
      { label: "H_Sakurai", link: "/h-sakurai" },
      { label: "H-Svecia 1", link: "/h-svecia-1" },
      { label: "H-Svecia 2", link: "/h-svecia-2" },
      { label: "H-Svecia 3", link: "/h-svecia-3" },
      { label: "J-OS -Outside service", link: "/j-os-outside-service" },
      { label: "L-Zebra", link: "/l-zebra" },
      { label: "Q-Lam", link: "/q-lam" },
      { label: "N-LAM-AUTO", link: "/n-lam-auto" },
      { label: "V-PICKPLC2", link: "/v-pickplc2" },
      
    ],
  },
  {
    label: "Finishing",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [
      { label: "V-ASSEMBLE", link: "/v-assemble" },
      { label: "V-FINISH", link: "/v-finish" },
    ],
  },
  {
    label: "Inspection",
    icon: IconCalendarStats,
    initiallyOpened: false,
    links: [{ label: "V-INSPECT", link: "/v-inspect" }],
  },
  {
    label: "Delivery Queue",
    icon: IconPresentationAnalytics,
    link: "/delivery-queue",
  },
];

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

function NavbarNestedBasic({
  width,
  handleLogout,
  user,
}: {
  width: any;
  handleLogout: any;
  user: any;
}) {
  const navigate = useNavigate();

  const { classes } = useStyles();
  const handleClick = (event: any, link: any) => {
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
      height={"calc(100% - 50px)"}
      width={width}
      // p="md"
      className={classes.navbar}
      sx={{
        overflow: "hidden",
        // transition: "width 1000ms ease, min-width 1000ms ease",
      }}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => logout(event)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={`${user.First_Name} ${user.Last_Name}`}
          email={user.Employee}
        />
      </Navbar.Section> */}
    </Navbar>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.getIn(["user", "user"]),
});

export const NavbarNested = connect(mapStateToProps, null)(NavbarNestedBasic);
