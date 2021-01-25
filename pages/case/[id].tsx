import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
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
  background-color: #ffffff;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: block;
  &>p {
    font-size: 12px;
    color: #646262;
  }
`
const Content = styled.form`
  padding: 10px 30px 0;
`

const StyledMain = styled.main`
  padding: 60px 0 0;
`

const Loading = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const Detail: React.FC <{data: {content: string, title: string, created_at: string}}> = (props: {data: {content: string, title: string, created_at: string}}) => {
  const router = useRouter()
  return (
    <React.Fragment>
      <Header noColorChange />
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