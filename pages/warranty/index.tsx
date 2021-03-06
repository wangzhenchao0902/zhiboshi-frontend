import React from 'react';
import 'antd/dist/antd.css'
import { Alert } from 'antd';
import { Form, message, Input, Button } from 'antd';
import styled from 'styled-components'
import { useState } from 'react'
import {registerWarranties} from '../../api/warranty'

const Div = styled.div`
  margin: 20px;
`

const Header = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
`

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Register = (props: {query: {sn: string}}) => {

  const [suc, setSuc] = useState(false)

  const onFinish = async (values) => {
    const res = await (await registerWarranties(values)).json()
    if (res.result) {
      setSuc(true)
      // message.success('注册成功');
    } else {
      message.error(res.msg);
    }
  };

  return (
    <>
    <Header>
      智博士质保注册
    </Header>
    <Div>
      {suc &&<Alert
        message="注册成功"
        description="您可到智博士官网查询质保期限。"
        type="success"
        showIcon
      />
      }
      {!suc && <Form {...layout}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish} 
        initialValues={{sn: props.query.sn}}
        validateMessages={validateMessages}>
        <Form.Item
          name="sn"
          label="产品编号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
        }
    </Div>
    </>
  );
};

export default Register

export async function getServerSideProps(context) {
  return {
    props: {query: context.query},
  }
}