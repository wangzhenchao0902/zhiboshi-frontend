import React from 'react'
import styled from 'styled-components'
import { Row, } from '../public/styled/styled'

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
const Col = styled.div`
  flex: 1;
  display: flex; flex-flow: column nowrap; align-items: left; justify-content: center; 
  & + & { margin-left: 40px; }
  p{ text-align: center; line-height: 2; }
`

const MFooter = styled.div`
  position: relative;
  background: #eee;
  padding: 10px 20px;
  h4{ position: relative; padding: 10px 0; margin: 20px 0; }
  h4::after{ content: ''; position: absolute; bottom: 0; left: 0; background: url('/static/m/m-line.png'); background-size: contain; width: 143px; height: 1px; }
  p{ line-height: 1.75; margin-top: 5px; }
  &::after{
    content: ''; position: absolute; right: 20px; bottom: 30%;
    background: url('/static/m/m-logo2.png'); background-size: contain; width: 155px; height: 143px; opacity: .1;
  }
`

const MBNav = styled.div`
  background: #333; color: #fff; padding: 10px 20px; position: fixed; bottom: 0; left: 0; right: 0; height: 60px;
  a{ color: #fff; font-size: 12px; }
  img{ font-size: 16px; width: 1em; height: 1em; }
  p { line-height: 1.75; }
`
const MBNavBottom = styled.div`
  background: #ee8222; color: #fff; font-size: 16px; border-radius: 6px; overflow: hidden; white-space: nowrap; font-size: 14px; 
  span{ padding: 5px 10px; display: inline-block; font-weight: bold; }
  span + span{ border-left: 1px solid #333; }
`

interface isState {
  isWeb: boolean,
}

class Footer extends React.Component<any, isState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isWeb: true,
    }
  }
  componentDidMount() {
    this.setState({ isWeb: window.innerWidth > 500, });
  }
  render() {
    return (
      <>
      {
        this.state.isWeb ?
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
                    <p><a rel='nofollow' href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.59f01452wuFVEA&id=646048752708&skuId=4657650336178&areaId=130900&user_id=2211831107054&cat_id=2&is_b=1&rn=d004edc98e5bdd83e8674d075e299fb6' target="_blank">天猫商城</a></p>
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
        :
          <>
            <MFooter>
              <h4><a href='/'><img src='/static/m/m-logo.png' style={{ width: 132, }} /></a></h4>
              <p>DRZ（智博士）国内汽车隐形车衣品牌，由中国科学院经过30年技术累积研发，作为中国乃至全球高分子材料技术的代表，它，是性能高手，也是坚持创新高品质车衣的领航者!</p>
              <p>拥有线上线下多家直营旗舰店和授权店,配备了专业的技术团队和服务顾问，可为您提供专业且优质的选膜贴膜服务。</p>

              <h4>购买渠道</h4>
              <p><a rel='nofollow' href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.59f01452wuFVEA&id=646048752708&skuId=4657650336178&areaId=130900&user_id=2211831107054&cat_id=2&is_b=1&rn=d004edc98e5bdd83e8674d075e299fb6' target="_blank">&gt;天猫智博士旗舰店</a></p>
              <p><a rel='nofollow' href='https://item.jd.com/10030890973547.html' target="_blank">&gt;京东智博士车品旗舰店</a></p>

              <h4>关于我们</h4>
              <p><a href='/about'>&gt;关于智博士</a></p>
              <p><a href='/about'>&gt;联系我们</a></p>

              <h4>关注我们</h4>
              <p><a href='http://weixin.qq.com/r/OBOSil3EkgDtrRnp90Yq'>&gt;官网微信</a></p>
              <p><a href='https://m.weibo.cn/u/7608507927'>&gt;官方微博</a></p>

              <h4>服务支持</h4>
              <p><a href='javascript:;'>&gt;常见问题</a></p>
              <p><a href='javascript:;'>&gt;网站地图</a></p>
              <p><a href='javascript:;'>&gt;售后政策</a></p>

              <Row style={{ marginTop: 20, textAlign: 'center', }}>
                <Col>
                  <a href='http://weixin.qq.com/r/OBOSil3EkgDtrRnp90Yq'><img src='/static/wx_qr.jpg' style={{ width: '32vw', }} /><p>微信公众号</p></a>
                </Col>
                <Col>
                  <a href='https://m.weibo.cn/u/7608507927'><img src='/static/wb_qr.jpg' style={{ width: '32vw', }} /><p>新浪微博</p></a>
                </Col>
              </Row>
            </MFooter>
            <div style={{ height: 60, }}></div>
            <MBNav>
              <Row style={{ justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', }}>
                <Col style={{ flex: 1, marginLeft: 0, }}><a href='/'><img src='/static/m/m-home.png' /><p>首页</p></a></Col>
                <Col style={{ flex: 1, marginLeft: 0, }}><a rel='nofollow' href='https://item.jd.com/10030890973547.html' target="_blank"><img src='/static/m/m-buy.png' /><p>购买</p></a></Col>
                <Col style={{ flex: 2, marginLeft: 10, }}>
                  <a href='tel:4006099891'>
                    <MBNavBottom>
                      <span>热线：400-609-9891</span>
                      <span>优惠报价</span>
                    </MBNavBottom>
                  </a>
                </Col>
              </Row>
            </MBNav>
          </>
      }
      </>
    )
  }
}

export default Footer