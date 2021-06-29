import React, { memo } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { withRouter } from 'next/router'
import { LINK_ROUTERS } from '../shared/router'
import { LOGO } from '../shared/config'

const StyledHeader = styled.header<{nTop: boolean}>`
  position: sticky;
  z-index: 1000;
  top: 0;
  width: 100%;
  min-width: 1200px;
  background-color: #000;
  border-bottom: 1px solid #666;
`

const Nav = styled.nav`
  transition: background-color 0.4s ease 0s;
  display: flex; flex-flow: row nowrap; align-items: center; justify-content: space-between;
  min-width: 1200px;
  width: 80%;
  margin: 0 auto;
`

const NavList = styled.div`
  display: flex;
  justify-content: center;
  a {
    margin: 0 40px;
    font-size: 16px;
    position: relative;
    color: #fff;
    &:hover{
      color: #aa5600;
      &::after {
        content: '';
        height: 3px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgb(236, 184, 179);
      }
    }
  }
  a + a::before{ content: ''; position: absolute; left: -2em; top: 50%; transform: translateY(-50%); width: 1px; background: #aa5600; height: 12px; }
`

const IconGroup = styled.div`
  display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
`

const StyledLink = styled.a<{selected:boolean}>`
  ${props => props.selected &&
      css`
        color: #ea4335!important;
        &::after {
          content: '';
          background-color: #ea4335!important;
          height: 3px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      `
    };
`

class Header extends React.Component<{noColorChange?: boolean, router: {pathname: string}}, {nTop: boolean, key: string}> {
  constructor(props: any) {
    super(props)
    this.state = {
      key: '',
      nTop: false || this.props.noColorChange
    }
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    this.setState({nTop: scrollTop > 0})
  }

  componentDidMount() {
    LINK_ROUTERS.forEach(e => {
      if (e.path == this.props.router.pathname) {
        this.setState({key: e.key})
      }
    })
    if (!this.props.noColorChange) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (!this.props.noColorChange) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  render(): React.ReactElement {
    return (
      <StyledHeader nTop = {this.state.nTop}>
        <Nav>
          <div><a href='/'><img src='/static/20210625/logo.png' style={{ width: 200, margin: '20px 10px', }} /></a></div>
          <NavList>
            {LINK_ROUTERS.map((item) => (
              <Link href={item.path} key={item.key} >
                <StyledLink selected={item.key == this.state.key}>{item.name}</StyledLink>
              </Link>
            ))}
          </NavList>
          <IconGroup>
            <a rel='nofollow' target="_blank" href='https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.466d14aeYKazSs&id=637914810177&skuId=4596575237340&user_id=2208842654796&cat_id=2&is_b=1&rn=c3a223361040bae8f1becf47b8e8bb80'><img style={{ width: 28, }} src='/static/20210625/tmall.png' /></a>
            <a rel='nofollow' target="_blank" href='https://item.jd.com/10030890973547.html'><img style={{ width: 28, marginLeft: 8, }} src='/static/20210625/jd.png' /></a>
          </IconGroup>
        </Nav>
      </StyledHeader>
    )
  }
}

export default memo(withRouter(Header))