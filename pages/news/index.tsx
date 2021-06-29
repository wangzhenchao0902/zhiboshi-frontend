import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
import Kv from '../../components/Kv'
import Link from 'next/link'
import Footer from '../../components/Footer'
import NewsList from '../../components/NewsList'
import { queryNews } from '../../api/article'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
  padding: 30px 0;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const Sidebar = styled.div`
  background: #fafafa; padding: 20px;
  width: 200px; margin-right: 20px;
  ul, li { margin: 0; padding: 0; }
  li{  list-style: none; text-align: center; padding: 10px; border-bottom: 1px solid #666; font-size: 18px; }
  a { color: #666; }
  a:hover{ color: #000; }
`;

const HotNews = styled.div`
  margin-top: 40px;
  li{ line-height: 2; border-bottom: 1px dashed #666; font-size: 12px; }
`;

const Nav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background: #ccc;
  &>p {
    width: 1136px;
    margin: 0 auto;
    color: #000;
  }
  a{ color: #838383; }
`
const BannerContainer = styled.div`
	width: 100%;
  background: url('/static/20210625/news-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 50vh;
  display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
`

const getData = async (params?: any) => {
  const res = await queryNews({...params, per_page: 10});
  const json = await res.json()
  const datas = [];
  json.data.data.forEach((item: any) => {
    datas.push({title: item.title, href: "/news/".concat(item.id), id: item.id, created_at: item.created_at})
  });
	return {
      total: json.data.total,
			data: datas
	}
}

const getIndexNews = async () => {
  const res = await queryNews({ per_page: 4});
  const json = await res.json()
  const datas = [];
  if (json.result) {
    json.data.data.forEach((item: any) => {
      datas.push({title: item.title, created_at: item.created_at, href: "/news/".concat(item.id), id: item.id})
    });
  }
	return {
			data: datas
	}
}

  class App extends React.Component <{data: {data: any, total: number}, news: any}> {
  pageChange = async (page: number): Promise<any> => {
    return getData({page});
  }

  render(): React.ReactElement {
		return (
			<React.Fragment>
				<Header />
				<main>
          <BannerContainer><img src='/static/20210625/news-banner-title.png' /></BannerContainer>
          <Nav><p><Link href='/'>首页</Link> {'>'} 新闻中心</p></Nav>
          <div style={{ background: '#fff', }}>
            <StyledContent>
              <StyledSection>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                  <Sidebar>
                    <ul>
                      <li><a href='#'>新闻资讯</a></li>
                      <li><a href='#'>公司新闻</a></li>
                      <li><a href='#'>行业新闻</a></li>
                    </ul>
                    <HotNews>
                      <ul>
                        <li style={{ fontSize: 18, borderBottom: '1px solid #666', }}>热门资讯</li>
                        {this.props.news.map(item =>  (
                          <li key={item.id}><a href={item.href}>{item.title}</a></li>
                        ))}
                      </ul>
                    </HotNews>
                  </Sidebar>
                  <div style={{ flex: 1, }}>
                    <NewsList paginator={
                      {
                        total: this.props.data.total,
                        paginatorChange: this.pageChange
                      }
                    } data = {this.props.data.data}></NewsList>
                  </div>
                </div>
              </StyledSection>
            </StyledContent>
          </div>
				</main>
				<Footer />
			</React.Fragment>
		)
  }
}

export default App

export async function getStaticProps(): Promise<{
}> {
  const res = await getData();
  const newsData = await getIndexNews();
	return {
		props: {
			data: {data: res.data, total: res.total},
      news: newsData.data,
    },
    revalidate: 1,
	}
}


