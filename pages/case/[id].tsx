import Header from '../../components/Header'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import { showArticle, allIds } from '../../api/article'
import { Spin } from 'antd';
import 'antd/dist/antd.css'
import { CaseBannerContainer, ArtContainer, ArtLoading, ArtTitle, ArtContent, BreadcrumbNav, } from '../../public/styled/styled'

const Detail: React.FC <{data: {content: string, title: string, created_at: string}}> = (props: {data: {content: string, title: string, created_at: string}}) => {
  const router = useRouter()
  const [isWeb, setIsWeb] = useState(true);
  useEffect(() => {
    setIsWeb(window.innerWidth > 500);
  });
  return (
    <React.Fragment>
      <Header noColorChange />
      <>
          {
            isWeb ? 
              <>
                <CaseBannerContainer><img src='/static/20210625/case-banner-title.png' /></CaseBannerContainer>
                <BreadcrumbNav><p><Link href='/'>首页</Link> {'>'} <Link href='/case'>案例中心</Link></p></BreadcrumbNav>
                <ArtContainer>
                    <section>
                      {router.isFallback && (<ArtLoading><Spin size="large" /></ArtLoading>)}
                      {!router.isFallback && (
                        <>
                          <ArtTitle>{props.data.title}<p>{props.data.created_at}</p></ArtTitle>
                          <ArtContent dangerouslySetInnerHTML={{__html: props.data.content}}></ArtContent>
                        </>
                      )}
                    </section>
                </ArtContainer>
              </>
            :
            <>
              <main>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-case.jpg' style={{width: '100%', }} /></div>
                <div style={{ padding: 20, }}>
                  <section>
                    {router.isFallback && (<ArtLoading><Spin size="large" /></ArtLoading>)}
                    {!router.isFallback && (
                      <>
                        <ArtTitle>{props.data.title}<p>{props.data.created_at}</p></ArtTitle>
                        <ArtContent dangerouslySetInnerHTML={{__html: props.data.content}}></ArtContent>
                      </>
                    )}
                  </section>
                </div>
              </main>
            </>
          }
      </>
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