import type { EditableTableProps } from '@/types';
import { useMemo, useState } from 'react';
import 'react-resizable/css/styles.css';
import Table from './Table';

const EditableTable: React.FC<EditableTableProps> = ({ columns: defaultColumns, ...restProps }) => {
  const [columns, setColumns] = useState<any>(defaultColumns);

  const handleResize =
    (column: any) =>
    (e: any, { size }: any) => {
      const newColumns = [...columns];
      newColumns.forEach((item) => {
        if (item === column) {
          item.width = size.width;
        }
      });
      setColumns(newColumns);
    };

  const newColumns = useMemo(() => {
    return columns.map((col: any) => {
      col.width = 200;
      col.onHeaderCell = () => ({
        width: col.width,
        onResize: handleResize(col),
      });
      return col;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return <Table columns={newColumns} {...restProps} />;
};

export default EditableTable;
