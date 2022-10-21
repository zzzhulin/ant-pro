import type { FormInstance } from 'antd';
import React from 'react';
import Cell from './Cell';
import Row from './Row';

export const EditableContext = React.createContext<FormInstance<any> | null>(null);

const body = {
  row: Row,
  cell: Cell,
};

export default body;
