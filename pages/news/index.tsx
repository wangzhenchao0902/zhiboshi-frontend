import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'
import NewsList from '../../components/NewsList'
import { queryNews } from '../../api/article'
import { NewsBannerContainer, BreadcrumbNav, Row, Col, } from '../../public/styled/styled'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
  padding: 30px 0;
  section { margin-bottom: 30px; }
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

class App extends React.Component <{data: {data: any, total: number}, news: any, isWeb: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = {
      isWeb: true,
    }
  }

  pageChange = async (page: number): Promise<any> => {
    return getData({page});
  }

  componentDidMount() {
    this.setState({ isWeb: window.innerWidth > 500, });
  }

  render(): React.ReactElement {
		return (
      <React.Fragment>
        <Header />
        { 
          this.state.isWeb ? 
          <main>
            <NewsBannerContainer><img src='/static/20210625/news-banner-title.png' /></NewsBannerContainer>
            <BreadcrumbNav><p><Link href='/'>首页</Link> {'>'} 新闻中心</p></BreadcrumbNav>
            <div style={{ background: '#fff', }}>
              <StyledContent>
                <section>
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
                </section>
              </StyledContent>
            </div>
          </main>
          :
          <main>
            <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-news.jpg' style={{width: '100%', }} /></div>
            <Row style={{ lineHeight: 4, textAlign: 'center', color: '#fff', letterSpacing: 2, }}>
              <Col style={{ flex: 1, background: '#ee7500',  }}>公司新闻</Col>
              <Col style={{ flex: 1, background: '#333',  }}>行业新闻</Col>
            </Row>
            <NewsList paginator={
              {
                total: this.props.data.total,
                paginatorChange: this.pageChange
              }
            } data = {this.props.data.data}></NewsList>
          </main>
        }
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


