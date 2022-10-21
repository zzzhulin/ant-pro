import { history } from 'umi';

const BatchManage: React.FC = () => {
  const goToAuditDetail = () => {
    history.push({
      pathname: `/batch/list/audit/file`,
      //   query: {
      //     role,
      //   },
    });
  };
  const goToSampleDetail = () => {
    history.push({
      pathname: `/batch/sample/detail`,
      //   query: {
      //     role,
      //   },
    });
  };
  const goToAnalysisResult = () => {
    history.push({
      pathname: `/batch/analysis/result`,
      //   query: {
      //     role,
      //   },
    });
  };
  return (
    <div>
      <a onClick={goToAuditDetail}>审核文件</a>
      <a onClick={goToAnalysisResult}>分析结果</a>
      <a onClick={goToSampleDetail}>样本详情</a>
    </div>
  );
};

export default BatchManage;
