import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import { capitalize, intersection, invert, keys, merge, values } from 'lodash';
import { dynamic, history, IRoute, RunTimeLayoutConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { queryUserInfo } from './services';
import type { CurrentUser } from './types';
import { findKey, parseRoutes } from './utils';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  polling?: number;
  // menuData?: any;
  fetchUserInfo?: () => Promise<CurrentUser>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await queryUserInfo();
      if (res.code === 0) {
        return res.data;
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error(`查询用户信息失败，${error}`);
    }
    return undefined;
  };
  const currentUser = await fetchUserInfo();
  // const { roleMatch, userRole } = currentUser || { roleMatch: {}, userRole: '' };
  // const data = intersection(values(roleMatch), userRole.split(','));
  // const menuData = data.map((item) => {
  //   const role = findKey(roleMatch, item);
  //   return {
  //     path: `/audit/${role}`,
  //     name: `${role}Audit`,
  //   };
  // });

  return {
    currentUser,
    // menuData: [
    //   // {
    //   //   path: '/batch',
    //   //   name: 'batchManage',
    //   //   icon: 'FileSearch',
    //   //   access: 'canBatch',
    //   //   routes: [
    //   //     {
    //   //       path: '/batch/list',
    //   //       name: 'batchList',
    //   //       component: './BatchManage',
    //   //     },
    //   //     {
    //   //       path: '/batch/sample/list',
    //   //       name: 'sampleList',
    //   //       // component: './SampleManage',
    //   //       hideInMenu: true,
    //   //     },
    //   //     {
    //   //       path: '/batch/sample/detail',
    //   //       name: 'sampleDetail',
    //   //       // component: './SampleManage/SampleDetail',
    //   //       hideInMenu: true,
    //   //     },
    //   //     {
    //   //       path: '/batch/list/audit/file',
    //   //       name: 'auditFile',
    //   //       component: './AuditManage/AuditDetail',
    //   //       hideInMenu: true,
    //   //     },
    //   //     {
    //   //       path: '/batch/analysis/result',
    //   //       name: 'analysisResult',
    //   //       // component: './AuditManage/AnalysisResult',
    //   //       hideInMenu: true,
    //   //     },
    //   //     {
    //   //       path: '/batch/analysis/list',
    //   //       name: 'analysisList',
    //   //       // component: './AuditManage/AnalysisResult',
    //   //       hideInMenu: true,
    //   //     },
    //   //   ],
    //   // },
    //   {
    //     path: '/audit',
    //     name: 'auditManage',
    //     routes: menuData,
    //   },
    // ],
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <div>{initialState?.currentUser?.userName}</div>,
    disableContentMargin: true,
    onPageChange: () => {},
    menuHeaderRender: undefined,
    // menu: {
    //   // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    //   params: initialState,
    //   request: async (params, defaultMenuData) => {
    //     return initialState?.menuData;
    //   },
    // },
    ...initialState?.settings,
  };
};

let extraRoutes;

export function patchRoutes({ routes }) {
  merge(routes, extraRoutes);
  console.log(routes, extraRoutes);
}

export function render(oldRender) {
  fetch('/flowService/permissions')
    .then((res) => res.json())
    .then((res) => {
      const { roleMatch, userRole } = res.data || { roleMatch: {}, userRole: '' };
      const data = intersection(values(roleMatch), userRole.split(','));
      const menuData = data.map((item) => {
        const role = findKey(roleMatch, item);
        return {
          path: `/audit/${role}`,
          name: `${role}Audit`,
          access: `can${capitalize(role)}Audit`,
          intlMenuKey: `menu.auditManage.${role}Audit`,
          hideInMenu: false,
        };
      });
      extraRoutes = [
        {
          path: '/',
          routes: [
            {
              path: '/audit',
              name: 'auditManage',
              routes: [{ path: '/audit', redirect: menuData[0].path }, ...menuData],
            },
          ],
        },
      ];
      oldRender();
    });
}

export function onRouteChange({ location, routes, matchedRoutes, action }) {
  const unaccessible = matchedRoutes.find(
    (item) => location.pathname === item.route.path && item.route.path !== '/',
  )?.route?.unaccessible;
  if (unaccessible) {
    history.replace(matchedRoutes[1].route.path);
  }
  console.log('当前路由', unaccessible);

  console.log(location, routes, matchedRoutes);
  // const menu = matchedRoutes.find((item) => !item.route.unaccessible && item.route.path !== '/');
  // console.log(menu.route.routes);
  // const firstAuthMenu = menu.route.routes.find((item) => !item.unaccessible);
  // console.log(firstAuthMenu);
}
