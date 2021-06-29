import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
import Kv from '../../components/Kv'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import { showArticle, allIds } from '../../api/article'
import { Spin } from 'antd';
import 'antd/dist/antd.css'

const StyledContent = styled.div`
	width: 1136px;
	margin: 20px auto;
  padding: 30px 0;
  min-height: 600px;
  // background-color: #ffffff;
`

const StyledSection = styled.section`
  white-space: pre-wrap;
  margin-bottom: 30px;
`

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  display: block;
  line-height: 2;
  color: #fff;
  &>p {
    font-size: 14px;
    color: #646262;
  }
`
const Content = styled.form`
  padding: 10px 30px 0;
  color: #fff;
  & p:empty{ padding: .75em; }
  img{ max-width: 100%; }
`

const StyledMain = styled.main`
  padding: 60px 0 0;
`

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
  a{ color: #fff; }
`

const Loading = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const BannerContainer = styled.div`
	width: 100%;
  background: url('/static/20210625/case-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 50vh;
  display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
`

const Detail: React.FC <{data: {content: string, title: string, created_at: string}}> = (props: {data: {content: string, title: string, created_at: string}}) => {
  const router = useRouter()
  return (
    <React.Fragment>
      <Header noColorChange />
      <BannerContainer><img src='/static/20210625/case-banner-title.png' /></BannerContainer>
      <Nav><p><Link href='/'>首页</Link> {'>'} <Link href='/case'>案例中心</Link></p></Nav>
      <StyledMain>
        <StyledContent>
          <StyledSection>
            {router.isFallback && (<Loading><Spin size="large" /></Loading>)}
            {!router.isFallback && (
              <>
                <Title>{props.data.title}<p>{props.data.created_at}</p></Title>
                <Content dangerouslySetInnerHTML={{__html: props.data.content}}></Content>
              </>
            )}
          </StyledSection>
        </StyledContent>
      </StyledMain>
      <Footer />
    </React.Fragment>
  )
}

export default Detail

const getData = async (id: string | string[]) => {
  const res = await showArticle(id);
  const json = await res.json()
	return {
			data: json.data
	}
}

export async function getStaticProps({params}): Promise<{
}> {
  const res = await getData(params.id);
	return {
		props: {
			data: res.data
    },
    revalidate: 1,
	}
}

export async function getStaticPaths() {
  const res = await allIds(2);
  const json = await res.json()
  const paths = json.data.map((item) => ({
    params: { id: item.id.toString() },
  }))
  return {
    paths,
    fallback: true
  };
}