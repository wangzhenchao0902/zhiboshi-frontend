import React, { memo } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { withRouter } from 'next/router'
import { LINK_ROUTERS } from '../shared/router'
import { LOGO } from '../shared/config'

const height = 56;

const StyledHeader = styled.header<{nTop: boolean}>`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  min-width: 1280px;
  height: ${height}px;
  ${props => !props.nTop &&
  css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(40, 40, 39, 0) 100%);
    a {
      color: rgb(255, 255, 255);
    }
  `}
  ${props => props.nTop &&
  css`
    box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
    nav {
      background-color: rgb(255, 255, 255);
    }
  `}
`

const Nav = styled.nav`
  height: ${height}px;
  transition: background-color 0.4s ease 0s;
  display: flex;
  justify-content: center;
  a {
    margin: 0 20px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    &:hover {
      &::after {
          content: '';
          background-color: rgb(236, 184, 179);
          height: 3px;
          width: 100%;
          position: absolute;
          bottom: 0;
        }
    }
  }
`

const LogoDiv = styled.div`
  width: 200px;
  height: ${height}px;
  position: absolute;
  padding: 10px 32px;
  box-sizing:border-box;
  left: 0;
`

const Logo = styled.img`
  width: ${height}px;
  height: 36px;
`

const StyledLink = styled.a<{selected:boolean}>`
  ${props => props.selected &&
      css`
        &::after {
          content: '';
          background-color: rgb(234, 67, 53) !important;
          height: 3px;
          width: 100%;
          position: absolute;
          bottom: 0;
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
          <LogoDiv>
            <Logo src={LOGO}></Logo>
          </LogoDiv>
          {LINK_ROUTERS.map((item) => (
            <Link href={item.path} key={item.key}>
              <StyledLink selected={item.key == this.state.key}>{item.name}</StyledLink>
            </Link>
          ))}
        </Nav>
      </StyledHeader>
    )
  }
}

export default memo(withRouter(Header))