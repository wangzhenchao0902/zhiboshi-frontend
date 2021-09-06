import Header from '../components/Header'
import styled, { css } from 'styled-components'
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { showAbout } from '../api/article'
import Link from 'next/link'
import 'antd/dist/antd.css'
import { Title, Nowrap, Row, Col, } from '../public/styled/styled'

const Nav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background: #161616;
  &>p {
    width: 1136px;
    margin: 0 auto;
    color: #fff;
  }
  a{ color: #838383; }
`

const SectionTitle = styled.h1`
  margin: 0; padding: 0; font-size: 32px; color: #fff; font-weight: bold; position: relative; padding-bottom: 10px;
`;
const SectionDesc = styled.div`
  color: #ccc; font-size: 16px;
  width: 80%;
  p{ margin-top: 32px; text-align: left; line-height: 2.25; }
`

const BannerContainer = styled.div`
	width: 100%;
  background: url('/static/20210625/about-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 50vh;
  display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
`

const Detail: React.FC <{data: {content: string, title: string, created_at: string}}> = (props: {data: {content: string, title: string, created_at: string}}) => {
  const [data, setData] = useState(props.data);
  const [selectItem, setSelectItem] = useState('about');
  const [isWeb, setIsWeb] = useState(true);
  useEffect(() => {
    setIsWeb(window.innerWidth > 500);
  });
  const HandleChange = async (path: string) => {
    const res = await getData(path)
    setSelectItem(path);
    setData(res.data);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
      <>
          {
            isWeb ? 
              <>
                <BannerContainer><img src='/static/20210625/about-banner-title.png' /></BannerContainer>
                <Nav><p><Link href='/'>首页</Link> {'>'} 关于我们</p></Nav>
                <div><img src='/static/20210625/data.1.jpg' style={{width: '100%', }} /></div>
                <div style={{ background: 'url("/static/20210625/about-bg.jpg") no-repeat', backgroundSize: 'cover', padding: '30px 30px 100px', }}>
                  <Row style={{minWidth: 1200, width: '80%', padding: '30px 0', margin: '0 auto'}}>
                    <Col style={{ lineHeight: 0, flex: 1, }} ><img src='/static/20210625/about-intro.jpg' style={{ height: 560, }} /></Col>
                    <Col style={{ marginLeft: 60, flex: 1,}}>
                      <SectionTitle>品牌介绍</SectionTitle>
                      <SectionDesc>
                        <p>智博士隐形车衣（漆面保护膜）由中国科学院高分子材料团队联合多院所共同研发。中科新材具有超过20年高分子薄膜领域技术积累，上百项新材料技术专利，国际领先的车衣研发水平，铸就智博士傲绝群雄的过硬质量。</p>
                        <p>智博士隐形车衣采用进口旗舰品牌同款TPU原料，中科鼎力打造，相比于国外进口品牌，具有超强的耐候性、耐磨性、耐污性、超高的亮度、超强的划痕自修复功能、具有全新科技生产工艺。</p>
                        <p>智博士隐形车衣，掌握核心科技，让您放心驾驶、安心停靠、省心保值。</p>
                      </SectionDesc>
                    </Col>
                  </Row>
                  <div><img src='/static/20210625/about-brand.png' style={{height: 560, margin: '50px auto 0', display: 'block', }} /></div>
                  <div><img src='/static/20210625/about-team.png' style={{height: 175, margin: '50px auto 0', display: 'block', }} /></div>
                </div>
                <div><img src='/static/20210625/brand.jpg' style={{width: '100%', }} /></div>
                <div><img src='/static/20210625/youshi.jpg' style={{width: '100%', }} /></div>
              </>
            :
            <div style={{ background: '#f7f7f7', }}>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-aboutus.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-aboutus-data.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-aboutus-brand.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, margin: '20px auto', textAlign: 'center', }}><img src='/static/m/m-aboutus-1.png' style={{width: '76.2%', }} /></div>
              <div style={{ lineHeight: 0, margin: '0 auto', textAlign: 'center', }}><img src='/static/m/m-aboutus-2.png' style={{width: '88.9%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-aboutus-3.png' style={{width: '100%', }} /></div>
            </div>
          }
        </>
      <Footer />
    </React.Fragment>
  )
}

export default Detail

const getData = async (path: string) => {
  const res = await showAbout(path);
  const json = await res.json()
	return {
			data: json.data
	}
}

export async function getStaticProps(): Promise<{
}> {
  const res = await getData('about');
	return {
		props: {
			data: res.data
    },
    revalidate: 1,
	}
}