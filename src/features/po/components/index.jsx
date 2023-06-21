import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Code, Grid, Flex } from '@mantine/core';

export function PoForm({ handleSubmit }) {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      jobID: '',
    },

    // transformValues: (values) => ({
    //   fullName: `${values.firstName} ${values.lastName}`,
    //   age: Number(values.age) || 0,
    // }),
  });

  return (
    <Box mx='auto'>
      <form
        component='form'
        onSubmit={form.onSubmit((values) =>
          // setSubmittedValues(JSON.stringify(values, null, 2))
          handleSubmit(values)
        )}
      >
        <Grid gutter={5} gutterXs='md' gutterMd='xl' gutterXl={50} align='end'>
          <Grid.Col span={4}>
            <TextInput
              label='Job'
              placeholder='Job'
              {...form.getInputProps('jobID')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Button type='submit'>Submit</Button>
          </Grid.Col>
        </Grid>
      </form>

      {submittedValues && <Code block>{submittedValues}</Code>}
    </Box>
  );
}
