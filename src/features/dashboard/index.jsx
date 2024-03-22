import { connect } from 'react-redux';

import {
  IconExternalLink,
  IconFileAnalytics,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';

import {
  LoadingOverlay,
  Card,
  Flex,
  Text,
  Group,
  Button,
  Image,
  Title,
  Grid,
  Divider,
  Blockquote,
} from '@mantine/core';

function Dashboard({ dashboardLoading, user }) {
  let userName = `${user.First_Name} ${user.Last_Name}`;

  const admins = [
    'Sumit Mahajan',
    'Susan Baskfield',
    'Nate Baskfield',
    'Mike Baskfield',
    'Jon Erie',
  ];

  return (
    <div>
      <LoadingOverlay
        visible={dashboardLoading}
        zIndex={1000}
        overlayprops={{ radius: 'sm', blur: 2 }}
      />
      <Grid mt={50} justify='center'>
        <Grid.Col span={10} mb={25}>
          <Flex justify='center' direction='column' align='center'>
            <Title fw={700}>GLI Dashboard</Title>
            <Divider
              size='md'
              style={{ width: '20%' }}
              labelPosition='center'
            />
          </Flex>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card
            shadow='md'
            padding='lg'
            radius='md'
            withBorder
            ml={50}
            mr={50}
            miw={200}
          >
            <Card.Section>
              <Image
                src='https://www.general-label.com/wp-content/uploads/2019/02/Main-Printed-Graphics-small.jpg'
                withPlaceholder
                height={120}
                width={300}
              />
            </Card.Section>
            <Group mt='md' mb='xs'>
              <IconSettings />
              <Text mt={5} ml={-10} fw={700}>
                Production
              </Text>
            </Group>
            <Flex direction='column'>
              <Button
                variant='outline'
                leftIcon={<IconExternalLink size='0.9rem' />}
                component='a'
                href='https://app.powerbi.com/links/ZwxuSn6yhl?ctid=9b5657ef-de44-4eef-8af8-940d7576cc72&pbi_source=linkShare'
                target='_blank'
                mb={10}
              >
                Quality Objective
              </Button>
              <Button
                variant='outline'
                leftIcon={<IconExternalLink size='0.9rem' />}
                component='a'
                href='https://app.powerbi.com/links/8Y5k-MB_6A?ctid=9b5657ef-de44-4eef-8af8-940d7576cc72&pbi_source=linkShare'
                target='_blank'
                mb={10}
              >
                Quality KPI
              </Button>
              <Button
                variant='outline'
                leftIcon={<IconExternalLink size='0.9rem' />}
                component='a'
                href='https://app.powerbi.com/links/vNtgtHIFI_?ctid=9b5657ef-de44-4eef-8af8-940d7576cc72&pbi_source=linkShare'
                target='_blank'
                mb={10}
              >
                Rockway
              </Button>
            </Flex>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card
            shadow='md'
            padding='lg'
            radius='md'
            withBorder
            ml={50}
            mr={50}
            miw={200}
          >
            <Card.Section>
              <Image
                src='https://www.general-label.com/wp-content/uploads/2019/02/Main-Solutions-small.jpg'
                withPlaceholder
                height={120}
                width={300}
              />
            </Card.Section>
            <Group mt='md' mb='xs'>
              <IconUser />
              <Text mt={5} ml={-10} fw={700}>
                Employee
              </Text>
            </Group>
            <Flex direction='column'>
              <Button
                variant='outline'
                leftIcon={<IconExternalLink size='0.9rem' />}
                component='a'
                href='https://app.powerbi.com/links/qAbgk83uDU?ctid=9b5657ef-de44-4eef-8af8-940d7576cc72&pbi_source=linkShare'
                target='_blank'
                mb={10}
              >
                Employee Time
              </Button>
              {/* <Button
              variant="outline" 
              leftIcon={<IconExternalLink size="0.9rem" />}
              component="a"
              href="./request"
              target="_blank"
              mb={10}
              >
              Vacation Request Form
            </Button> */}
            </Flex>
          </Card>
        </Grid.Col>
        {admins.includes(userName) && (
          <Grid.Col span={3}>
            <Card
              shadow='md'
              padding='lg'
              radius='md'
              withBorder
              ml={50}
              mr={50}
              miw={200}
            >
              <Card.Section>
                <Image
                  src='https://scontent.ffcm1-1.fna.fbcdn.net/v/t1.6435-9/135805862_2755462371373958_3443409699820907461_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=GWj_B2hSH2kAX8jJkRQ&_nc_ht=scontent.ffcm1-1.fna&oh=00_AfDAprpitFnA_82PaTYrNSUGFiK8QJ-bb7QYk8sYza7BSA&oe=65E2176C'
                  withPlaceholder
                  height={120}
                  width={300}
                />
              </Card.Section>
              <Group mt='md' mb='xs'>
                <IconFileAnalytics />
                <Text mt={5} ml={-10} fw={700}>
                  Admin
                </Text>
              </Group>
              <Flex direction='column'>
                <Button
                  variant='outline'
                  leftIcon={<IconExternalLink size='0.9rem' />}
                  component='a'
                  href='https://app.powerbi.com/links/vNtgtHIFI_?ctid=9b5657ef-de44-4eef-8af8-940d7576cc72&pbi_source=linkShare'
                  target='_blank'
                  mb={10}
                >
                  Rockway
                </Button>
              </Flex>
            </Card>
          </Grid.Col>
        )}
        <Blockquote color='blue' mt={50} cite='- Phil Jackson'>
          The strength of the team is each individual member. The strength of
          each member is the team.
        </Blockquote>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dashboardLoading: state.getIn(['dashboard', 'dashboardLoading']),
  user: state.getIn(['user', 'user']),
});

export default connect(mapStateToProps, {})(Dashboard);
