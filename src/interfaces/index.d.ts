export interface ICategory {
  id: string;
  title: string;
}

export interface IPost {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'rejected';
  category: number;
  content: any;
  createdAt: string;
}

export interface ColumnButtonProps {
  column: Column<any, any>;
}

export interface FilterElementProps {
  value: any;
  onChange: (value: any) => void;
}
