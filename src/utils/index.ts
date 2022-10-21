import { message } from 'antd';
import type { IRoute } from 'umi';

export const downloadFile = (url: string, filename: string) => {
  const element = document.createElement('a');
  document.body.appendChild(element);
  element.style.display = 'none';
  element.href = url;
  element.download = filename;
  element.click();
  document.body.removeChild(element);
  message.success('开始下载');
};

export const downloadData = (res: any) => {
  const url = window.URL.createObjectURL(res.data);
  const filename = decodeURIComponent(
    res?.response?.headers?.get('Content-Disposition')?.split('=')[1] || '',
  );
  downloadFile(url, filename);
};

export const renderAuditProgress = (state: string) => {
  switch (state) {
    case '1':
      return 'ant-btn-link ant-btn-success';
    case '2':
      return 'ant-btn-link ant-btn-processing';
    case '3':
      return 'ant-btn-link ant-btn-processing';
    case '-1':
      return 'ant-btn-link ant-btn-error';
    case '-2':
      return 'ant-btn-link ant-btn-error';
  }
  return 'ant-btn-link ant-btn-processing';
};

export const renderAnalysisProgress = (state: number, progress: number) => {
  switch (state) {
    case 1:
      return { className: 'ant-btn-link ant-btn-processing', text: '未启动' };
    case 2:
      return { className: 'ant-btn-link ant-btn-processing', text: '等待下机' };
    case 3:
      return { className: 'ant-btn-link ant-btn-processing', text: `${progress}%` };
    case 4:
      return { className: 'ant-btn-link ant-btn-success', text: '已完成' };
    case 5:
      return { className: 'ant-btn-link ant-btn-error', text: '异常终止' };
    case 6:
      return { className: 'ant-btn-link ant-btn-processing', text: '结果修改中' };
    case 7:
      return { className: 'ant-btn-link ant-btn-success', text: '结果修改成功' };
    case 8:
      return { className: 'ant-btn-link ant-btn-error', text: '结果修改失败' };
  }
  return { className: 'ant-btn-link ant-btn-processing', text: `${progress}%` };
};

export const findKey = (obj: any, value: any, compare = (a: any, b: any) => a === b) => {
  return Object.keys(obj).find((k) => compare(obj[k], value));
};

export const parseRoutes = (authRoutes: IRoute[]) => {
  if (authRoutes) {
    return authRoutes.map((item) => ({
      path: item.path,
      name: item.name,
      component: require('@/pages/Welcome').default,
    }));
  }
  return [];
};
