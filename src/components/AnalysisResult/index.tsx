import EditableTable from '@/components/EditableTable';
import { queryAnalysisResult } from '@/services';
import type { AnaRes } from '@/types';
import { TableContext } from '@/utils/context';
import type { TablePaginationConfig } from 'antd';
import { Button, Tabs, message } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

type Props = {
  module?: string; // 产品线
  batchNo?: string; //分析批次
  clientId?: string; //客户端id
  sampleId?: string; //样本编号
  version?: number; // 修改记录版本
};

const AnalysisResult: React.FC<Props> = (props) => {
  const {
    module = '86gene',
    batchNo = '221009_A00268_AHF7LKDSX5_csmart2_0_SPM_v20_86_BJ_auto',
    clientId = 'a6913625-a250-4dbb-b505-024a74ed94b0',
    sampleId = 'Z22N00471-B1TA',
    version,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [originTabs, setOriginTabs] = useState<AnaRes.DataTypes.TabTypes[]>([]);
  const [tabs, setTabs] = useState<AnaRes.DataTypes.TabTypes[]>([]);
  const [rootDir, setRootDir] = useState<string>('');

  const [tableParams, setTableParams] = useState<AnaRes.QueryParams>({
    current: 1,
    pageSize: 20,
  });

  const getAnalysisResult = async () => {
    setLoading(true);
    try {
      const res = await queryAnalysisResult({
        module,
        batchNo,
        clientId,
        sample: sampleId,
        sorter: '',
        version,
        ...tableParams,
      });
      if (res.code === 0) {
        if (tabs.length === 0) {
          setTabs(res.data.entries);
          setRootDir(res.data.rootDir);
          setOriginTabs(res.data.entries);
        } else {
          // setTabs(updateData(tabs, res.data.entries));
          // setOriginTabs(updateData(originTabs, res.data.entries));
        }
      } else {
        message.error(res.msg);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(`获取tabs失败,错误：${err}`);
    }
  };

  const handleAdd = () => {};

  const handleModify = (row: any) => {
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // setDataSource(newData);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    tableName: string,
    sheetName: string,
  ) => {
    setTableParams({
      ...pagination,
      filter: filters,
      tableName,
      sheetName,
    });
  };

  useEffect(() => {
    getAnalysisResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams)]);

  const renderTableHeaderTitle = (addable: boolean) => {
    return (
      <Button onClick={handleAdd} type="primary" disabled={!addable}>
        Add a row
      </Button>
    );
  };

  const renderTabContent = (
    tabId: number,
    addable: boolean,
    sheetName: string,
    tables: AnaRes.DataTypes.TableTypes[],
  ) => {
    return tables.map(({ id, columns: defaultColumns, rowDatas, tableName, totalNum }) => {
      const columns = defaultColumns.map((item: any) => ({
        ...item,
        width: item.width || 300,
        ellipsis: true,
        // ...getColumnSearchProps(item.dataIndex, filterValues, tableName),
      }));
      // .concat(
      //   igv.length > 0
      //     ? [
      //         {
      //           title: 'igv',
      //           dataIndex: 'option',
      //           align: 'center',
      //           editable: false,
      //           fixed: 'right',
      //           width: 80,
      //           ellipsis: false,
      //           renderText: (text: string, record: any) => {
      //             const allowViewIgv = igv.every((item) => {
      //               return record[item] !== '-';
      //             });
      //             const field = igv.find((item) => record[item] === '-');
      //             const title = `${field}的值为'-'，不能查看igv`;
      //             return allowViewIgv ? (
      //               <a
      //                 className="ant-btn-link ant-btn-processing"
      //                 id="ijv"
      //                 onClick={() => openIgvModal(igv, record)}
      //               >
      //                 igv
      //               </a>
      //             ) : (
      //               <Tooltip title={title} placement="left">
      //                 <a type="link" className="ant-btn-link ant-btn-processing ant-btn-disabled">
      //                   igv
      //                 </a>
      //               </Tooltip>
      //             );
      //           },
      //         },
      //       ]
      //     : [],
      // );
      return (
        <TableContext.Provider key={id} value={{ handleModify: (row: any) => handleModify(row) }}>
          <EditableTable
            bordered
            editable
            size="small"
            tableLayout="fixed"
            rowKey="Id"
            dataSource={rowDatas}
            columns={columns}
            loading={loading}
            options={false}
            search={false}
            scroll={{ x: 1300, y: 'auto' }}
            pagination={{
              total: totalNum,
              size: 'default',
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            headerTitle={renderTableHeaderTitle(addable)}
            onChange={(pagination, filters) =>
              handleTableChange(pagination, filters, tableName, sheetName)
            }
          />
        </TableContext.Provider>
      );
    });
  };

  return (
    <Tabs
      tabPosition="left"
      items={tabs.map(({ id, addable, sheetName, tables }) => {
        return {
          label: sheetName,
          key: String(id),
          children: renderTabContent(id, addable, sheetName, tables),
        };
      })}
    />
  );
};

export default AnalysisResult;
