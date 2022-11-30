import { ReactNode, useRef } from 'react';
import { Create, FormControl, FormErrorMessage, FormLabel, Input, Select, InputGroup, Button } from '@pankod/refine-chakra-ui';
import { useSelect } from '@pankod/refine-core';
import { useForm, UseFormRegisterReturn } from '@pankod/refine-react-hook-form';
import { IPost } from '../../interfaces';

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = ({ register, accept, multiple, children }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

  function handleClick() {
    inputRef.current?.click();
  }

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

export default function PostCreate() {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    getValues,
    register,
    formState: { errors, touchedFields },
  } = useForm<IPost>();

  const { options } = useSelect({
    resource: 'category',
  });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required';
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
    }
    return true;
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
      <FormControl mb="3" isInvalid={!!errors?.category}>
        <FormLabel>Category</FormLabel>
        <Select
          id="category"
          placeholder="Select Category"
          {...register('category', {
            required: 'Category is required',
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.category?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Image</FormLabel>
        <FileUpload accept={'image/*'} multiple register={register('image', { validate: validateFiles })}>
          <Button>Import</Button>
        </FileUpload>
        <FormErrorMessage>{`${errors.image?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
}
