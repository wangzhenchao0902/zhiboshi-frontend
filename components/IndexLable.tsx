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
  margin-bottom: 20px;
  &>div {
    position: relative;
    padding: 0 0 0 14px;
    img {
      position: absolute;
      left: -10px;
      height: 24px;
      width: 24px;
    }
    span {
      font-size: 22px;
      line-height: 24px;
      display: block;
    }
    strong {
      font-size: 14px;
      display: block;
    }
  }
  &>a {
    display: block;
  }
`

const Body = styled.div`
  padding: 5px 0;
`

const IndexLable: React.FC<LableProps> = (props: LableProps) => {
  return <>
    <Header>
      <div>
        <img src="/static/tag.svg"></img>
        <span>{props.title}</span>
        <strong>{props.en_title}</strong>
      </div>
      {props.allHref && (
        <Link href={props.allHref}>查看全部</Link>
      )}
    </Header>
    <Body>
      {props.children}
    </Body>
  </>
}

export default IndexLable;