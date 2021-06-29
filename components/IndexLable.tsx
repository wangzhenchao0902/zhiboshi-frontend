import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export type LableProps = {
  children?: any;
  allHref?: string;
  title: string;
  en_title: string;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7px;
  margin: 10px 0;
  color: #ee7500;
  position: relative;
  &>div {
    position: relative;
    flex: 1;
    img {
      position: absolute;
      left: -10px;
      height: 24px;
      width: 24px;
    }
    strong {
      font-size: 24px;
      line-height: 24px;
      font-weight: normal;
    }
    span {
      font-size: small;
      margin-left: .5em;
    }
  }
  & a {
    display: block;
    color: #ee7500;
 }
 &::before{ content: ''; position: absolute; bottom: 0; left: 0; width: 26px; height: 1px; background: #ee7500; }
`

const Body = styled.div`
  padding: 5px 0;
`

const IndexLable: React.FC<LableProps> = (props: LableProps) => {
  return <>
    <Header>
      <div>
        <strong>{props.title}</strong>
        <span>{props.en_title}</span>
      </div>
      {props.allHref && (
        <Link href={props.allHref}>更多新闻</Link>
      )}
    </Header>
    <Body>
      {props.children}
    </Body>
  </>
}

export default IndexLable;