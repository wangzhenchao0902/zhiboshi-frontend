import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spin } from 'antd';
import 'antd/dist/antd.css'
import { Header, Footer, } from '../../components/'
import { NewsBannerContainer, ArtContainer, ArtLoading, ArtTitle, ArtContent, BreadcrumbNav, } from '../../public/styled/styled'
import { showArticle, allIds } from '../../api/article'

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
                <NewsBannerContainer><img src='/static/20210625/news-banner-title.png' /></NewsBannerContainer>
                <BreadcrumbNav><p><Link href='/'>首页</Link> {'>'} <Link href='/news'>新闻中心</Link></p></BreadcrumbNav>
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
              <main>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-news.jpg' style={{width: '100%', }} /></div>
                <div style={{ padding: 20, background: '#fff', }}>
                  <section>
                    {router.isFallback && (<ArtLoading><Spin size="large" /></ArtLoading>)}
                    {!router.isFallback && (
                      <>
                        <ArtTitle style={{color: '#333',}}>{props.data.title}<p>{props.data.created_at}</p></ArtTitle>
                        <ArtContent dangerouslySetInnerHTML={{__html: props.data.content}}></ArtContent>
                      </>
                    )}
                  </section>
                </div>
              </main>
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
  const res = await allIds(1);
  const json = await res.json()
  const paths = json.data.map((item) => ({
    params: { id: item.id.toString() },
  }))
  return {
    paths,
    fallback: true
  };
}