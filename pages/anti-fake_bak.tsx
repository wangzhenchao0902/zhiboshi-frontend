import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { queryWarranties } from '../api/warranty'
import { List, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'
import { Header, Footer, } from '../components/'
import { Row, Col, } from '../public/styled/styled'

const StyledContent = styled.main`
	width: 100%;
  background: url('/static/20210625/zhibao-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

const FakeTitle = styled.div`
  text-align: center;
  letter-spacing: 1em;
  h2{ color: #ee7500; font-size: 32px; }
  h3{ color: #ee7500; font-size: 16px; }
`

const SelectForm = styled.div`
  width: 300px;
  margin: 30px auto;
  text-align: center;
  label{ display: none; color: #fff!important; }
  input{ color: #ee7500; background: transparent; border: none; border-bottom: 1px solid #666; text-align: center; box-shadow: none!important; }
  input:focus{ border: none; border-bottom: 1px solid #ee7500; box-shadow: none; }
`

const WarrantyList = styled.div`
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
  text-align: center;
  color: #ee7500!important;
  div { color: #ee7500!important; }
`

const AntiFake: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(undefined);
  const [isWeb, setIsWeb] = useState(true);
  useEffect(() => {
    setIsWeb(window.innerWidth > 500);
  });
  const handleSearch = async () => {
    const fields = form.getFieldsValue();
    const res = await (await queryWarranties(fields.phone)).json();
    setData(res.data);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
        <>
          {
            isWeb ? 
              <>
              <StyledContent>
                <StyledSection>
                  <FakeTitle style={{ marginTop: 40, }}>
                    <h2>车衣质保查询</h2>
                    <h3>DRZ智博士您的第一款车衣</h3>
                  </FakeTitle>
                  <SelectForm>
                    <Form form={form}
                      onFinish={handleSearch}
                      layout="vertical">
                      <Form.Item rules={[{ required: true, message: '请输入手机号！' }]} name='phone' label="手机号" required tooltip="请先扫码商品二维码注册后查询">
                        <Input style={{ color: 'rgb(238, 117, 0)!important', }} placeholder="请输入手机号" />
                      </Form.Item>
                      <Form.Item style={{marginTop: 20, }}>
                        <Button type="primary" htmlType="submit" style={{ background: '#ee7500', borderColor: '#ee7500', padding: '0 2em', }}>查询</Button>
                      </Form.Item>
                    </Form>
                  </SelectForm>
                  <WarrantyList>
                    {data instanceof Array && data.filter(d => d.status === 1).length > 0 && (
                      <>
                        <List>
                          <List.Item>
                            <div style={{ width: 100, }}>姓名</div>
                            <div style={{ width: 100, }}>手机号</div>
                            <div style={{ width: 100, }}>质保型号</div>
                            <div style={{ width: 80, }}>质保时长</div>
                            <div style={{ flex: 1, }}>开始时间</div>
                            <div style={{ flex: 1, }}>结束时间</div>
                          </List.Item>
                          {data.filter(d => d.status === 1).map(item => (
                            <List.Item key={item.id}>
                              <div style={{ width: 100, }}>{item.name}</div>
                              <div style={{ width: 100, }}>{item.phone}</div>
                              <div style={{ width: 100, }}>{item.category || "不限"}</div>
                              <div style={{ width: 80, }}>{item.year}年</div>
                              <div style={{ flex: 1, }}>{item.start_at}</div>
                              <div style={{ flex: 1, }}>{item.end_at}</div>
                            </List.Item>
                          ))}
                        </List>
                        {data[0].complimentary === 1 && (
                          <>售后政策：质保期内 意外剐蹭局部免费补膜，总计不超15米 </>
                        )}
                        <><img src='/static/zhibao.png' style={{ width: 600, margin: '24px auto' }} /></>
                      </>
                    )}
                    {data instanceof Array && data.filter(d => d.status === 1).length === 0 && (
                      <>抱歉，未查到相关质保记录</>
                    )}
                    </WarrantyList>
                </StyledSection>
              </StyledContent>
              </>
            :
              <>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-zhibao.jpg' style={{width: '100%', }} /></div>
                <SelectForm>
                  <Form form={form}
                    onFinish={handleSearch}
                    layout="vertical">
                    <Form.Item rules={[{ required: true, message: '请输入手机号！' }]} name='phone' label="手机号" required tooltip="请先扫码商品二维码注册后查询">
                      <Input style={{ color: 'rgb(238, 117, 0)!important', }} placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item style={{marginTop: 20, }}>
                      <Button type="primary" htmlType="submit" style={{ background: '#ee7500', borderColor: '#ee7500', padding: '0 2em', }}>查询</Button>
                    </Form.Item>
                  </Form>
                </SelectForm>
                <WarrantyList style={{ width: 'auto', padding: 20, fontSize: 12, lineHeight: 2.25, }}>
                  {data instanceof Array && data.filter(d => d.status === 1).length > 0 && (
                    <>
                      <Row style={{ whiteSpace: 'nowrap', textAlign: 'left', }}>
                        <Col>姓名：{data[0].name}</Col>
                        <Col style={{ flex: 1, marginLeft: 20, }}>手机号： {data[0].phone}</Col>
                      </Row>
                      <Row style={{ whiteSpace: 'nowrap', textAlign: 'left', }}>
                        <Col>质保型号：{data[0].category || "不限"}</Col>
                        <Col style={{ flex: 1, marginLeft: 20, }}>质保时长：{data[0].year}年</Col>
                      </Row>
                      <Row style={{textAlign: 'left', }}>开始时间： {data[0].start_at}</Row>
                      <Row style={{textAlign: 'left', }}>结束时间： {data[0].end_at}</Row>
                      {data[0].complimentary === 1 && (
                        <Row style={{textAlign: 'left', }}>售后政策：质保期内 意外剐蹭局部免费补膜，总计不超15米</Row>
                      )}
                      <><img src='/static/zhibao.png' style={{ width: '100%', margin: '24px auto' }} /></>
                    </>
                  )}
                  {data instanceof Array && data.filter(d => d.status === 1).length === 0 && (
                    <>抱歉，未查到相关质保记录</>
                  )}
                  </WarrantyList>
              </>
          }
      </>
      <Footer />
    </React.Fragment>
  )
}

export default AntiFake