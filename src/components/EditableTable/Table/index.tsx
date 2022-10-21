import { TableContext } from '@/utils/context';
import { ProTable } from '@ant-design/pro-table';
import { useContext } from 'react';
import 'react-resizable/css/styles.css';
import body from './Body';
import header from './Header';
import { lowerCase } from 'lodash';
import type { EditableTableProps } from '@/types';

const Table: React.FC<EditableTableProps> = ({
  columns: defaultColumns,
  dataSource,
  originDataSource,
  editable = false,
  ...restProps
}) => {
  const tableContext = useContext(TableContext)!;
  const { handleModify } = tableContext;

  const renderClassName = (record: any, dataIndex: any) => {
    const originValue = originDataSource.find((item: any) => item.Id === record.Id)?.[dataIndex];
    const newValue = dataSource?.find((item) => item.Id === record.Id)?.[dataIndex];
    if (dataIndex === 'CheckField' && lowerCase(record[dataIndex]).slice(0, 4) === 'fail') {
      return 'error';
    }
    if (originValue !== newValue || record.isNewRow) {
      return 'warning';
    }
    return '';
  };

  const columns = defaultColumns?.map((col) => {
    if (!col.editable || !editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any): any => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        className: renderClassName(record, col.dataIndex),
        handleModify,
      }),
    };
  });

  return (
    <ProTable
      columns={columns}
      dataSource={dataSource}
      components={{ header, body }}
      {...restProps}
    />
  );
};

export default Table;
