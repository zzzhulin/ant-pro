import type { CurrentUser } from './types';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser: CurrentUser }) {
  const { currentUser = { permissionCodes: [] } } = initialState;
  const { permissionCodes = [] } = currentUser;
  return {
    canBatch: permissionCodes.includes('AnaData_Batch_Menu'),
    canAudit: permissionCodes.includes('AnaData_Audit_Menu'),
    canBioAudit: permissionCodes.includes('AnaData_Bio_Audit_Menu'),
    canMedicalAudit: permissionCodes.includes('AnaData_Medical_Audit_Menu'),
    canReportAudit: permissionCodes.includes('AnaData_Report_Audit_Menu'),
  };
}
