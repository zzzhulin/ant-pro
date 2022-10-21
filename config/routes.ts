export default [
  // {
  //   path: '/',
  //   redirect: '/index.html',
  // },
  // {
  //   path: '/batch',
  //   name: 'batchManage',
  //   icon: 'FileSearch',
  //   access: 'canBatch',
  //   routes: [
  //     {
  //       path: '/batch/list',
  //       name: 'batchList',
  //       component: './BatchManage',
  //     },
  //     {
  //       path: '/batch/sample/list',
  //       name: 'sampleList',
  //       // component: './SampleManage',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/batch/sample/detail',
  //       name: 'sampleDetail',
  //       // component: './SampleManage/SampleDetail',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/batch/list/audit/file',
  //       name: 'auditFile',
  //       component: './AuditManage/AuditDetail',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/batch/analysis/result',
  //       name: 'analysisResult',
  //       // component: './AuditManage/AnalysisResult',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/batch/analysis/list',
  //       name: 'analysisList',
  //       // component: './AuditManage/AnalysisResult',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   path: '/audit',
  //   name: 'auditManage',
  //   icon: 'audit',
  //   access: 'canAudit',
  //   routes: [
  //     {
  //       path: '/audit/:role',
  //       // name: 'bioAudit',
  //       component: './AuditManage',
  //       // access: 'canBioAudit',
  //     },
  //     // {
  //     //   path: '/audit/medical',
  //     //   name: 'medicalAudit',
  //     //   component: './AuditManage',
  //     //   access: 'canMedicalAudit',
  //     // },
  //     // {
  //     //   path: '/audit/report',
  //     //   name: 'reportAudit',
  //     //   component: './AuditManage',
  //     //   access: 'canReportAudit',
  //     // },
  //     {
  //       path: '/audit/:role/detail',
  //       name: 'auditDetail',
  //       component: './AuditManage/AuditDetail',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/audit/:role/analysis/result',
  //       name: 'analysisResult',
  //       // component: './AuditManage/AnalysisResult',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/audit/:role/sample/detail',
  //       name: 'sampleDetail',
  //       // component: './SampleManage/SampleDetail',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   path: '/batch',
  //   name: 'batchManage',
  // },
  {
    path: '/audit',
    name: 'auditManage',
    routes: [
      {
        path: '/audit',
        redirect: '/audit/bio',
      },
      {
        path: '/audit/bio',
        name: 'bioAudit',
        component: './AuditManage',
        access: 'canBioAudit',
        hideInMenu: true,
      },
      {
        path: '/audit/medical',
        name: 'medicalAudit',
        component: './AuditManage',
        access: 'canMedicalAudit',
        hideInMenu: true,
      },
      {
        path: '/audit/report',
        name: 'reportAudit',
        component: './AuditManage',
        access: 'canReportAudit',
        hideInMenu: true,
      },
    ],
  },
];
