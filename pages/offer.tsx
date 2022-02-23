import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { queryWarranties } from '../api/warranty'
import { List, Form, Input, Button, Checkbox, Radio, Cascader, } from 'antd';
import 'antd/dist/antd.css'
import { Header, Footer, } from '../components/'
import { Row, Col, } from '../public/styled/styled'
import { bodyList, brandList, moList } from '../shared/config';

const StyledContent = styled.main`
	width: 100%;
  background: url('/static/20210625/zhibao-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
`
const FakeTitle = styled.div`
  text-align: center;
  letter-spacing: 1em;
  h2{ color: #ee7500; font-size: 32px; }
  h3{ color: #ee7500; font-size: 16px; }
`
let brandIDS = [], bodyIDS = [], moID = 0;
const Offer: React.FC = () => {
  const [isWeb, setIsWeb] = useState(true);
  const [offerMoney, setOfferMoney] = useState(-1)
  useEffect(() => {
    setIsWeb(window.innerWidth > 500);
  });
  const calcMoney = () => {
    if(brandIDS.length > 0 && bodyIDS.length > 0 && moID > 0) {
      setOfferMoney(0);
      let x = 0;
      bodyIDS.map(d => {
        let _which = bodyList.find(dd => dd.id === d);
        if(_which) {
          x += _which.priceList.find(d3 => d3.moId === moID).value;
        }
      })
      setTimeout(() => setOfferMoney(x), 700);
  } else {
      setOfferMoney(-1)
    }
  }
  const onBrandChange = (brands) => {
    brandIDS = brands;
    calcMoney();
  }
  const onMoChange = (e) => { 
    moID = e.target.value;
    calcMoney();
  };
  const onBodyChange = (bodys) => {
    bodyIDS = bodys;
    calcMoney();
  }

  const hideMoney =(visible) => {
    console.log(visible);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
        <>
          {
            isWeb ? 
              <>
              <StyledContent>
                <section>
                  <FakeTitle style={{ }}>
                    <h2>报价查询</h2>
                    <h3>DRZ智博士您的第一款车衣</h3>
                  </FakeTitle>
                  <div style={{width: 600, marginRight: 50, marginTop: 30, }}>
                    <Row style={{ marginTop: 30, alignItems: 'center', }}>
                      <Col style={{ color: '#ee7500', width: '100px', textAlign: 'right', }}>选择车型：</Col>
                      <Col style={{ color: '#ee7500', flex: 1, }}>
                        <Cascader options={brandList} onChange={onBrandChange} placeholder='请选择车型' changeOnSelect></Cascader>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 30, }}>
                      <Col style={{ color: '#ee7500', width: '100px', }}>选择车衣型号：</Col>
                      <Col style={{ color: '#ee7500', flex: 1, }}>
                        <Radio.Group onChange={onMoChange}>
                          {moList.map(d => (<Radio style={{width: '22.5%', marginBottom: 12, whiteSpace: 'nowrap', color: '#ee7500',  }} value={d.id}>{d.name}</Radio> ))}
                        </Radio.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 30, }}>
                      <Col style={{ color: '#ee7500', width: '100px', }}>选择装贴部位：</Col>
                      <Col style={{ color: '#ee7500', flex: 1, lineHeight: 2, }}>
                        <Checkbox.Group onChange={onBodyChange}>
                          <Row style={{ flexFlow: 'row wrap', }}>
                            {bodyList.map(d => (<Col style={{width: '24.1%', marginBottom: 12, }}><Checkbox value={d.id} style={{ color: '#ee7500', }}>{d.name}</Checkbox></Col>))}
                          </Row>
                        </Checkbox.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 10, alignItems: 'center', }}>
                      <Col style={{ color: '#ee7500', width: '100px', textAlign: 'right',  }}>报价：</Col>
                      <Col style={{ color: '#ee7500', flex: 1, fontSize: '3em', }}>{ offerMoney === -1 ? '暂无报价': offerMoney === 0 ? '正在获取报价...' : (offerMoney + '元')}</Col>
                    </Row>
                  </div>
                </section>
              </StyledContent>
              </>
            :
              <>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-baojia.jpg' style={{width: '100%', }} /></div>
                <div style={{ padding: '40px 20px', }}>
                  <Row style={{ alignItems: 'center', }}>
                    <Col style={{ color: '#ee7500', width: '70px', textAlign: 'right', }}>选择车型：</Col>
                    <Col style={{ color: '#ee7500', flex: 1, }}>
                      <Cascader options={brandList} onChange={onBrandChange} placeholder='请选择车型' changeOnSelect></Cascader>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 30, }}>
                    <Col style={{ color: '#ee7500', width: '70px', textAlign: 'right', }}>选&emsp;&emsp;择&emsp;<br />车衣型号：</Col>
                    <Col style={{ color: '#ee7500', flex: 1, }}>
                      <Radio.Group onChange={onMoChange}>
                        {moList.map(d => (<Radio style={{width: '46%', whiteSpace: 'nowrap', color: '#ee7500', marginBottom: 12, }} value={d.id}>{d.name}</Radio> ))}
                      </Radio.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20, }}>
                    <Col style={{ color: '#ee7500', width: '70px', textAlign: 'right', }}>选&emsp;&emsp;择&emsp;<br />装贴部位：</Col>
                    <Col style={{ color: '#ee7500', flex: 1, lineHeight: 2, }}>
                      <Checkbox.Group onChange={onBodyChange}>
                        <Row style={{ flexFlow: 'row wrap', }}>
                          {bodyList.map(d => (<Col style={{width: '46%', whiteSpace: 'nowrap', marginBottom: 12, }}><Checkbox value={d.id} style={{ color: '#ee7500', }}>{d.name}</Checkbox></Col>))}
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10, alignItems: 'center', }}>
                    <Col style={{ color: '#ee7500', width: '70px', textAlign: 'right',  }}>报价：</Col>
                    <Col style={{ color: '#ee7500', flex: 1, fontSize: '2em', }}>{ offerMoney === -1 ? '暂无报价': offerMoney === 0 ? '正在获取报价...' : (offerMoney + '元')}</Col>
                  </Row>
                </div>
              </>
          }
      </>
      <Footer />
    </React.Fragment>
  )
}

export default Offer