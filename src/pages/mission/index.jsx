import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  createStyles,
  rem,
  Button,
  Center,
} from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

function Mission() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/contracts`;
    navigate(path);
  };
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Mission Statement</Title>

      <Container size={560} p={0}>
        <Text size='sm' className={classes.description}>
          We empower our employees to continuously rethink and redesign
          processes by improving and enhancing their skills. By utilizing
          modern, precision tools and innovative processes, we can build next
          generation parts and have long-lasting relationships with our
          customers with quality always as the top priority.
        </Text>
      </Container>

      <hr />
      <Title className={classes.title}>Vision Statement</Title>

      <Container size={560} p={0}>
        <Text size='sm' className={classes.description}>
          We aspire to lead in the printed electronics, graphics, and material
          converting industries. With a commitment to quality, ceaseless
          innovation, and respect for the planet, we strive to exceed the
          expectations of our customers. 
        </Text>
      </Container>

      <Center mt={32} radius='xl' size='xl'>
        <Button onClick={routeChange}>Enter</Button>
      </Center>
    </Container>
  );
}

export default Mission;
