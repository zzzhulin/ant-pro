import { last } from 'lodash';
import { history } from 'umi';

type Props = {
  location: {
    pathname: string;
  };
};

const AuditManage: React.FC<Props> = (props) => {
  const role = last(props.location.pathname.split('/'));

  const goToAuditDetail = () => {
    history.push({
      pathname: `/audit/${role}/detail`,
      //   query: {
      //     role,
      //   },
    });
  };
  const goToSampleDetail = () => {
    history.push({
      pathname: `/audit/bio/sample/detail`,
      //   query: {
      //     role,
      //   },
    });
  };
  const goToAnalysisResult = () => {
    history.push({
      pathname: `/audit/bio/analysis/result`,
      //   query: {
      //     role,
      //   },
    });
  };
  return (
    <div>
      <a onClick={goToAuditDetail}>审核详情</a>
      {/* <a onClick={goToAnalysisResult}>分析结果</a>
      <a onClick={goToSampleDetail}>样本详情</a> */}
    </div>
  );
};

export default AuditManage;
