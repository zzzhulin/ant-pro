import { Resizable } from 'react-resizable';

type Props = {
  onResize: any;
  className: string;
  width: number;
  title: string;
  children: any;
};

const Cell: React.FC<Props> = (props) => {
  const { onResize, width = 100, ...restProps } = props;

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const header = {
  cell: Cell,
};

export default header;
