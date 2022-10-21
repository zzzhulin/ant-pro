import { history, useParams } from 'umi';

const AuditDetail: React.FC = (props) => {
  console.log(props);

  const { role }: { role: string } = useParams();
  console.log(role);

  const goToSampleDetail = () => {
    history.push({
      pathname: `/audit/${role}/sample/detail`,
    });
  };
  return (
    <div>
      <a onClick={goToSampleDetail}>样本详情</a>
    </div>
  );
};

export default AuditDetail;
