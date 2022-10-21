import type { InputRef } from 'antd';
import { Form, Input, Typography } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { EditableContext } from '../index';

const { Text, Paragraph } = Typography;

type Props = {
  editable: boolean;
  copyable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleModify: (record: any) => void;
};

const Cell: React.FC<Props> = ({
  editable,
  copyable,
  children,
  dataIndex,
  record,
  handleModify,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleModify({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onDoubleClick={toggleEdit}>
        <Text
          copyable={
            copyable
              ? {
                  tooltips: false,
                }
              : false
          }
          ellipsis={{
            tooltip: record[dataIndex],
          }}
        >
          {record[dataIndex]}
        </Text>
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default Cell;
