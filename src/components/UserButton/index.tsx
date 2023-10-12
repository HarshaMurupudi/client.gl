import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import { IconChevronRight, IconUser } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>

          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {icon || <IconUser size='0.9rem' stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
