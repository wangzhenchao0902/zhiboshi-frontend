import Header from '../components/Header'
import styled from 'styled-components'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { queryWarranties } from '../api/warranty'
import { List, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'

const StyledContent = styled.main`
	width: 1136px;
	margin: 20px auto;
  padding: 30px 0;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;
  min-height: 500px;
`

const FakeTitle = styled.div`
  height: 100px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SelectForm = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`

const WarrantyList = styled.div`
  width: 500px;
  min-height: 200px;
  margin: 0 auto;
  text-align: center;
`


const AntiFake: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(undefined);
  const handleSearch = async () => {
    const fields = form.getFieldsValue();
    const res = await (await queryWarranties(fields.phone)).json();
    setData(res.data);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
      <StyledContent>
        <StyledSection>
          <FakeTitle>质保查询</FakeTitle>
          <SelectForm>
            <Form form={form}
              onFinish={handleSearch}
              layout="vertical">
              <Form.Item rules={[{ required: true, message: '请输入手机号！' }]} name='phone' label="手机号" required tooltip="请先扫码商品二维码注册后查询">
                <Input placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">查询</Button>
              </Form.Item>
            </Form>
          </SelectForm>
          <WarrantyList>
            {data instanceof Array && data.length > 0 && (
              <List>
                <List.Item>
                  <div>姓名</div>
                  <div>手机号</div>
                  <div>开始时间</div>
                  <div>结束时间</div>
                </List.Item>
                {data.map(item => (
                  <List.Item key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.phone}</div>
                    <div>{item.start_at}</div>
                    <div>{item.end_at}</div>
                  </List.Item>
                ))}
              </List>
            )}
            {data instanceof Array && data.length === 0 && (
              <>抱歉，未查到相关质保记录</>
            )}
            </WarrantyList>
        </StyledSection>
      </StyledContent>
      <Footer />
    </React.Fragment>
  )
}

export default AntiFake