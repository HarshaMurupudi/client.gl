import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Text,
  Progress,
  RingProgress,
  Card,
  Grid,
  Skeleton,
  Container,
  ThemeIcon,
  Center,
} from '@mantine/core';

import { IconCheck } from '@tabler/icons-react';
const child = <Skeleton height={140} radius='md' animate={false} />;

const options = {
  title: {
    type: 'line',
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
};

function Dashboard() {
  const [pieOptions, setPieOptions] = useState({
    accessibility: {
      enabled: false,
    },
    title: {
      text: 'Pie Chart',
    },
    series: [
      {
        name: 'C1',
        data: [
          {
            name: '3',
            y: 21,
            color: '#FFEC48',
            visible: true,
            sliced: false,
            selected: false,
          },
          {
            name: '4',
            y: 21,
            color: '#8AA638',
            visible: true,
            sliced: false,
            selected: false,
          },
          {
            name: '5',
            y: 26,
            color: '#F69707',
            visible: true,
            sliced: false,
            selected: false,
          },
          {
            drilldown: 'other',
            name: 'Other',
            selected: false,
            sliced: false,
            visible: true,
            y: 32,
            color: '#BDDBE6',
          },
        ],
      },
    ],
    summarized: false,
    drilldown: {
      series: [
        {
          name: 'Other',
          id: 'other',
          data: [
            {
              name: '1',
              y: 13,
              color: '#7DA7D9',
              visible: true,
              sliced: false,
              selected: false,
            },
            {
              name: '2',
              y: 19,
              color: '#C74542',
              visible: true,
              sliced: false,
              selected: false,
            },
          ],
        },
      ],
    },
    boost: {
      enabled: false,
    },
    chart: {
      type: 'pie',
      events: {
        drilldown: function (e) {
          setTimeout(() => {
            setPieOptions({
              ...pieOptions,
              title: { text: 'Options Updated' },
            });
          }, 5000);
        },
        drillup: function (e) {
          console.log('drilled up');
        },
      },
    },
  });

  const chartOptions = {
    chart: {
      type: 'column',
      // height: (4 / 16) * 100 + '%', // 16:9 ratio
    },
    title: {
      text: 'Highcharts',
    },
    series: [
      {
        // `type: column` is required for type-checking this options as a column series
        type: 'column',
        data: [1, 2, 3],
      },
    ],
    xAxis: {
      categories: ['Foo', 'Bar', 'Baz'],
      labels: {
        useHTML: true,
        formatter: () => '',
      },
    },
  };

  return (
    <Container my='md'>
      <Grid>
        <Grid.Col xs={4}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Grid.Col>
        <Grid.Col xs={8}>
          <HighchartsReact
            highcharts={Highcharts}
            options={pieOptions}
            containerProps={{ style: { height: '100%' } }}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <RingProgress
            sections={[{ value: 40, color: 'blue' }]}
            label={
              <Text color='blue' weight={700} align='center' size='xl'>
                40%
              </Text>
            }
          />

          <RingProgress
            sections={[{ value: 100, color: 'teal' }]}
            label={
              <Center>
                <ThemeIcon color='teal' variant='light' radius='xl' size='xl'>
                  <IconCheck size={22} />
                </ThemeIcon>
              </Center>
            }
          />
        </Grid.Col>
        <Grid.Col xs={5}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: '100%' } }}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Card
            withBorder
            radius='md'
            padding='xl'
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
              Monthly goal
            </Text>
            <Text fz='lg' fw={500}>
              $5.431 / $10.000
            </Text>
            <Progress value={54.31} mt='md' size='lg' radius='xl' />
          </Card>
          <Card
            withBorder
            radius='md'
            padding='xl'
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
              Monthly goal
            </Text>
            <Text fz='lg' fw={500}>
              $5.431 / $10.000
            </Text>
            <Progress value={54.31} mt='md' size='lg' radius='xl' />
          </Card>
        </Grid.Col>
        {/* <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col> */}
        {/* <Grid.Col xs={6}>{child}</Grid.Col> */}
      </Grid>
    </Container>
  );
}

export default Dashboard;
