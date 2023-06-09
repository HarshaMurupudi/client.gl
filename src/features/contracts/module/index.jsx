import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Code, Grid, Flex } from '@mantine/core';

export function ContractForm({ handleSubmit }) {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      Job: '',
      Part_Number: '',
      Customer_PO: '',
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
          handleSubmit(values, form)
        )}
      >
        <Grid gutter={5} gutterXs='md' gutterMd='xl' gutterXl={50}>
          <Grid.Col span={4}>
            <TextInput
              label='Job'
              placeholder='Job'
              {...form.getInputProps('Job')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label='Part Number'
              placeholder='Part Number'
              {...form.getInputProps('Part_Number')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              type='text'
              label='PO Number'
              placeholder='PO'
              {...form.getInputProps('Customer_PO')}
            />
          </Grid.Col>
        </Grid>
        <Flex justify='center' my={32}>
          <Button type='submit'>Submit</Button>
        </Flex>
      </form>

      {submittedValues && <Code block>{submittedValues}</Code>}
    </Box>
  );
}
