import React from 'react';
import 'antd/dist/antd.css'
import { Alert } from 'antd';
import styled from 'styled-components'

const Div = styled.div`
  margin: 80px 20px;
`

const Header = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
`

const Register = () => {
  return (
    <>
    <Header>
      智博士质保注册
    </Header>
    <Div>
        <Alert
        message="注册成功"
        description="您可到智博士官网查询车窗膜质保期限。"
        type="success"
        showIcon
        />
    </Div>
    </>
  );
};

export default Register
