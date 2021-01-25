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
  flex-direction: column;
  justify-content: center;
  img {
    height: 80px;
    height: 80px;
  }
  height: 120px;
`

const Qr = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 80px;
    height: 80px;
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
            <p>联系我们</p>
            <p>售后服务</p>
            <p>天猫地址</p>
            <p>淘宝地址</p>
          </Article>
          <Contact>
            <Qr>
              <img src="/static/qr.png" />
            </Qr>
            <Phone>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3343" width="32" height="32"><path d="M510.834454 76.245522c-240.85865 0-436.111612 195.252962-436.111612 436.110589 0 240.85865 195.252962 436.106496 436.111612 436.106496 240.856603 0 436.104449-195.247846 436.104449-436.106496C946.938903 271.499507 751.691057 76.245522 510.834454 76.245522L510.834454 76.245522 510.834454 76.245522 510.834454 76.245522zM510.834454 910.554228c-219.910549 0-398.204258-178.292686-398.204258-398.198118 0-219.909525 178.292686-398.202211 398.204258-398.202211 219.903386 0 398.202211 178.292686 398.202211 398.202211C909.031549 732.261543 730.73784 910.554228 510.834454 910.554228L510.834454 910.554228 510.834454 910.554228 510.834454 910.554228zM599.052658 552.11565c-19.951401 0-35.060517 17.962094-53.159734 17.962094-17.955954 0-96.768951-77.677127-96.768951-96.77509 0-19.09694 17.955954-28.502148 17.955954-48.310286 0-14.260795-53.15871-101.476159-74.961272-101.476159-21.813818 0-74.968435 38.905078-74.968435 74.962296 0 104.329137 192.397938 304.288285 312.827775 304.288285 33.208333 0 74.973552-35.065634 74.973552-74.973552C705.232956 612.82943 618.860796 552.11565 599.052658 552.11565" p-id="3344" fill="#ffffff"></path></svg> 
              &nbsp;400-0108-803
            </Phone>
          </Contact>
        </Content>
        <Copyright><span><img src='/static/icon-police.png' /> 渝ICP备2020014744号</span></Copyright>
      </SytledFooter>
    )
  }
}

export default memo(Footer)