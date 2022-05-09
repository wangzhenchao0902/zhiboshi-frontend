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
                    <h2>质保查询</h2>
                    <h3>DRZ智博士您的第一款车衣</h3>
                  </FakeTitle>
                  <><img src='/static/wxqrcode.jpeg' style={{ width: 320, margin: '24px auto' }} /></>
                </StyledSection>
              </StyledContent>
              </>
            :
              <>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-zhibao.jpg' style={{width: '100%', }} /></div>
                <><img src='/static/wxqrcode.jpeg' style={{ width: 320, margin: '24px auto', display: 'block', }} /></>
              </>
          }
      </>
      <Footer />
    </React.Fragment>
  )
}

export default AntiFake