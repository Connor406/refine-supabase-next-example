import { useEffect } from 'react';
import { Edit, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@pankod/refine-chakra-ui';
import { useSelect } from '@pankod/refine-core';
import { useForm } from '@pankod/refine-react-hook-form';

import { IPost } from '../../interfaces';

export default function PostEdit() {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IPost>();

  const { options } = useSelect({
    resource: 'category',
    defaultValue: queryResult?.data?.data.category,
    queryOptions: { enabled: !!queryResult?.data?.data.category },
  });

  useEffect(() => {
    resetField('category');
  }, [options]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input id="title" type="text" {...register('title', { required: 'Title is required' })} />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="content"
          placeholder="Select Post Status"
          {...register('status', {
            required: 'Status is required',
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="category"
          placeholder="Select Category"
          {...register('category', {
            required: true,
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
}