import { GetServerSideProps } from 'next';
import { FC, useMemo } from 'react';
import { useTable, ColumnDef, flexRender } from '@pankod/refine-react-table';
import {
  List,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Text,
  DateField,
  Select,
  ShowButton,
  EditButton,
  DeleteButton,
} from '@pankod/refine-chakra-ui';
import { GetManyResponse, useMany, GetListResponse } from '@pankod/refine-core';
import { ICategory, IPost, FilterElementProps } from '../../interfaces';

const PostList: FC = () => {
  const columns = useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        enableColumnFilter: false,
      },
      {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'image',
        header: 'Image',
        accessorKey: 'image',
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select defaultValue="published" {...props}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="rejected">Rejected</option>
              </Select>
            );
          },
          filterOperator: 'eq',
        },
      },
      {
        id: 'category',
        header: 'Category',
        enableColumnFilter: false,
        accessorKey: 'category',
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoriesData: GetManyResponse<ICategory>;
          };
          const category = meta.categoriesData?.data.find((item) => item.id === getValue());
          return category?.title ?? 'Loading...';
        },
      },
      {
        id: 'createdAt',
        header: 'Created At',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton hideText size="sm" recordItemId={getValue() as number} />
              <EditButton hideText size="sm" recordItemId={getValue() as number} />
              <DeleteButton hideText size="sm" recordItemId={getValue() as number} />
            </HStack>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  const categoryIds = tableData?.data?.map((item) => item.category) ?? [];
  const { data: categoriesData } = useMany<ICategory>({
    resource: 'category',
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder && (
                      <HStack spacing="2">
                        <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                      </HStack>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

export default PostList;
