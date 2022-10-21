export const PREFIX = process.env.NODE_ENV === 'development' ? '' : '/eadp';

export const AUDIT_COUNT = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '>5',
    value: 5,
  },
];

export const AUDIT_STATUS = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 2,
  },
];

export const ANALYSIS_STATUS = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '未启动',
    value: 1,
  },
  {
    label: '等待下机',
    value: 2,
  },
  {
    label: '分析中',
    value: 3,
  },
  {
    label: '已完成',
    value: 4,
  },
  {
    label: '异常终止',
    value: 5,
  },
  {
    label: '结果修改中',
    value: 6,
  },
  {
    label: '结果修改成功',
    value: 7,
  },
  {
    label: '结果修改失败',
    value: 8,
  },
];
