import { Button } from 'antd';
import type { ButtonProps } from 'antd/lib/button/button';
import React from 'react';
import { Access, useModel } from 'umi';

type Props = {
  code: string;
} & ButtonProps;

const AuthButton: React.FC<Props> = (props) => {
  const { code } = props;
  const { initialState } = useModel('@@initialState');
  const userInfo = initialState?.currentUser;

  const accessible = userInfo?.permissionCodes.includes(code) || false;

  return (
    <Access accessible={accessible}>
      <Button {...props}>{props.children}</Button>
    </Access>
  );
};

export default AuthButton;
