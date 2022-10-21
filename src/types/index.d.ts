import type { ProColumnType, ProTableProps } from '@ant-design/pro-table';

type EditableTableProps = {
  editable?: boolean;
  originDataSource?: any;
} & ProTableProps<any, any, any>;

type CurrentUser = {
  permissionCodes: string[];
  userName: string;
  userId: string;
  userRole: string;
  orgCode: string;
  approvalSeq: {
    canApproval: boolean;
    canModify: boolean;
    canReject: boolean;
    canAbnormal: boolean;
    nextOrg: string;
    orgCode: string;
    orgName: string;
    preOrg: string;
  }[];
  roleMatch: {
    bio: string;
    medical: string;
    report: string;
  };
};

type HttpResponse = {
  code: number;
  data: any;
  msg: string;
};

type CommonParams = {
  module?: string;
  batchNo?: string;
  clientId?: string;
};

declare namespace AnaRes {
  type QueryParams = {
    sheetName?: string;
    tableName?: string;
    sample?: string;
    current?: number;
    pageSize?: number;
    sorter?: string;
    version?: number;
    filter?: any;
  } & CommonParams;

  namespace DataTypes {
    type TabTypes = {
      id: number;
      addable: boolean;
      sheetName: string;
      tables: TableTypes[];
    };

    type TableTypes = {
      columns: ProColumnType[];
      current: number;
      id: number;
      igv: string[];
      modifyConf: {
        addRowConf: {
          newRowFields: any;
        };
        delRowConf: {
          locFields: string[];
        };
        mergeRowConf: {
          locSelectFields: string[];
          newRowDataFields: string[];
          uniqSelectFields: string[];
        };
        modifyCellConf: {
          locFields: string[];
          modifyFields: string[];
        };
      };
      pageSize: number;
      rowDatas: any;
      tableName: string;
      totalNum: number;
    };
  }

  type DownloadParams = {
    samples?: string[];
  } & CommonParams;
}

declare namespace Sample {
  type QueryParams = {
    sampleSource?: string;
    clientid?: string;
    queryType?: number;
    batchno?: string;
    sample?: string;
    subproduct?: string;
    hospital?: string;
    processor?: string;
    org?: string;
    deadlineBegDt?: string;
    deadlineEndDt?: string;
    pagesize?: number;
    current?: number;
  };

  type DataTypes = {
    id: number;
    sampleIndex: number;
    cancerType: string;
    Hospital: string;
    org: string;
    progress: string;
    bioApprovalor: string;
    bioApprovalTime: string;
    medApprovalor: string;
    medApprovalTime: string;
    medApprovalStatus: string;
    repApprovalor: string;
    repApprovalTime: string;
    repApprovalStatus: string;
    deadline: string;
    enable: string;
    createtime: string;
    updatetime: string;
    batchNo: string;
    sampleId: string;
    seqType: string;
    subProduct: string;
    projectId: string;
    libName: string;
    ssIndex: string;
    note: string;
    controlled: string;
    matchType: string;
    matchCaseid: string;
    virtualAnalysisModule: string;
    clientId: string;
    refuseOrgs: string;
  };

  type DownloadParams = {
    sampleIndexes?: number[];
    queryType?: number;
  };
}

declare namespace Batch {
  type DownloadParams = {
    batchIds?: number[];
  };

  type ImportParams = {
    type?: string;
    sheets?: any;
    force?: boolean;
  } & CommonParams;

  type ModifyParams = {
    sheets?: any;
  } & CommonParams;

  type QueryParams = {
    batchNo?: string;
    seqType?: string;
    module?: string;
    whetherAudit?: number;
    state?: number;
    startBeginTime?: string;
    startEndTime?: string;
    finishBeginTime?: string;
    finishEndTime?: string;
    current?: number;
    pageSize?: number;
    sorter?: string;
  };

  type DataTypes = {
    Id: number;
    BatchNo: string;
    SeqType: string;
    WhetherAudit: string;
    StartTime: string;
    FinishTime: string;
    State: number;
    Progress: number;
    ProgressDetail: string;
    PrimerVer: string;
    LibMethod: string;
    VirtualAnalysisModule: string;
    ClientId: string;
    SampleNum: number;
    SeqSampleNum: number;
    StartAnalysisTime: string;
    Enable: string;
    Createuserid: string;
    Createtime: string;
    Updateuserid: string;
    Updatetime: string;
  };
}
