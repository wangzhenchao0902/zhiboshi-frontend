import React, { memo } from 'react'
import styled from 'styled-components'
import { FOOTER_BACKGROUND } from '../shared/config'

const SytledFooter = styled.footer`
  min-width: 1280px;
  width: 100%;
  height: 180px;
  background-image: url(${FOOTER_BACKGROUND});
  background-size: cover;
  background-position: top center;
`

const Content = styled.div`
  color: #ffffff;
  width: 80%;
  font-size: 14px;
  display: flex;
  width: 80%;
  height: 150px;
  position: relative;
  transition: all 0.15s ease-in 0s;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  & a{ color: #fff; }
`

const Logo = styled.div`
  width: 50%;
  &>img {
    height: 100px;
  }
`

const Copyright = styled.div`
  text-align: center;
  font-size: 12px;
  color: #ffffff;
`

const Article = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 28px;
  font-size: 16px;
  height: 120px;
`

const Contact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  img {
    height: 120px;
    height: 120px;
  }
  height: 120px;
`

const Qr = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  text-align: center;
  img {
    height: 120px;
    height: 120px;
  }
`

const Phone = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

class Footer extends React.Component {
  render() {
    return (
      <SytledFooter>
        <Content>
          <Logo>
            <img src="/static/logo-white.png"></img>
          </Logo>
          <Article>
            <p><a href='mailto:wanghaic@ctime.net.cn' target='_blank'>联系我们</a></p>
            <p><a href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.466d14aeYKazSs&id=637914810177&skuId=4596575237340&user_id=2208842654796&cat_id=2&is_b=1&rn=c3a223361040bae8f1becf47b8e8bb80' target="_blank">天猫地址</a></p>
            <p><a href='https://item.jd.com/10030890973547.html' target="_blank">京东地址</a></p>
          </Article>
          <Contact>
            <Qr>
              <img src="/static/wx_qr.jpg" />
              <p>微信公众号</p>
            </Qr>
            <Qr>
              <img src="/static/wb_qr.jpg" />
              <p>新浪微博</p>
            </Qr>
          </Contact>
        </Content>
        <Copyright><span><img src='/static/icon-police.png' /> 渝ICP备2020014744号</span></Copyright>
      </SytledFooter>
    )
  }
}

export default memo(Footer)