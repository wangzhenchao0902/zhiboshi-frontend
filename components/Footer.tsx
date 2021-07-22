import React, { memo } from 'react'
import styled from 'styled-components'

const SytledFooter = styled.footer`
  min-width: 1280px;
  width: 100%;
  background: #fff;
  color: #000;
  a { color: rgba(0, 0, 0, .7); position: relative; }
  a:hover{ color: #ee7500; }
  a img{ display: none; position: absolute; left: 110%; top: 50%; transform: translate(0, -50%); width: 240px; height: 240px; z-index: 1; box-shadow: 0 0 3px 0 rgba(0, 0, 0, .7);}
  a:hover img{ display: block; }
`

const Copyright = styled.div`
  text-align: center;
  font-size: 16px;
  color: #000;
  padding: 20px;
`

const Qr = styled.div`
  text-align: center;
  width: 120px;
  img {
    width: 120px;
    height: 120px;
  }
`

const Row = styled.div`
  width: 100%; display: flex; flex-flow: row nowrap; align-items: flex-start; justify-content: flex-start; margin: 0 auto;
`
const Col = styled.div`
  flex: 1;
  display: flex; flex-flow: column nowrap; align-items: left; justify-content: center; 
  & + & { margin-left: 40px; }
  p{ text-align: center; line-height: 2; }
`

class Footer extends React.Component {
  render() {
    return (
      <SytledFooter>
        <Row style={{ width: '80%', minWidth: 1200, padding: '20px 20px 10px', }}>
          <Col style = {{ flex: 2, }}>
            <Row>
              <Col><Qr><img src="/static/wx_qr.jpg" /><p>公众号</p><p style={{ opacity: .7, }}>关注我们有惊喜</p></Qr></Col>
              <Col style={{ flex: 3, }}><Qr><img src="/static/wb_qr.jpg" /><p>新浪微博</p></Qr></Col>
            </Row>
          </Col>
          <Col style = {{ flex: 3, }}>
            <Row>
              <Col>
                <p><strong>购买渠道</strong></p>
                <p><a rel='nofollow' href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.466d14aeYKazSs&id=637914810177&skuId=4596575237340&user_id=2208842654796&cat_id=2&is_b=1&rn=c3a223361040bae8f1becf47b8e8bb80' target="_blank">天猫商城</a></p>
                <p><a rel='nofollow' href='https://item.jd.com/10030890973547.html' target="_blank">京东商城</a></p>
              </Col>
              <Col>
                <p><strong>关于我们</strong></p>
                <p><a href='/about'>关于智博士</a></p>
                <p><a href='/about'>联系我们</a></p>
              </Col>
              <Col>
                <p><strong>关注我们</strong></p>
                <p><a href='javascript:;'>官网微信<img src="/static/wx_qr.jpg" /></a></p>
                <p><a href='javascript:;'>官方微博<img src="/static/wb_qr.jpg" /></a></p>
              </Col>
              <Col>
                <p><strong>服务支持</strong></p>
                <p><a href='javascript:;'>常见问题</a></p>
                <p><a href='javascript:;'>网站地图</a></p>
                <p><a href='javascript:;'>售后政策</a></p>
              </Col>
            </Row>
            <Row style={{ textAlign: 'right', fontSize: '32px', color: '#000', paddingRight: '30px', letterSpacing: '2px', lineHeight: 1.75, justifyContent: 'flex-end', }}>400-609-9891</Row>
          </Col>
        </Row>
        <Row style={{ width: '80%', minWidth: 1200, padding: '0 20px 10px', alignItems: 'center', justifyContent: 'space-between', }}>
          <div>智博士邮箱：<a href='mailto:wanghaic@ctime.net.cn'>wanghaic@ctime.net.cn</a></div>
          <div><img src='/static/20210625/safe.png' style={{ height: 76, }} /></div>
        </Row>
        <Copyright><span><img src='/static/icon-police.png' /> <a href='https://beian.miit.gov.cn/' target='_blank' rel='nofollow'>渝ICP备2020014744号</a></span></Copyright>
      </SytledFooter>
    )
  }
}

export default memo(Footer)