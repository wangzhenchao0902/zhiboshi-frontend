import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
import Kv from '../../components/Kv'
import Link from 'next/link'
import Footer from '../../components/Footer'
import NewsList from '../../components/NewsList'
import { BANNERS } from '../../shared/config'
import { queryNews } from '../../api/article'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
  padding: 30px 0;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const Nav = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(216, 216, 216);
  &>p {
    width: 1136px;
    margin: 0 auto;
  }
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

class App extends React.Component <{data: {data: any, total: number}}> {
  pageChange = async (page: number): Promise<any> => {
    return getData({page});
  }

  render(): React.ReactElement {
		return (
			<React.Fragment>
				<Header />
				<main>
					<Kv data={BANNERS} />
          <Nav>
            <p><Link href='/'>首页</Link> {'>'} 新闻中心</p>
          </Nav>
					<StyledContent>
            <StyledSection>
              <NewsList paginator={
                {
                  total: this.props.data.total,
                  paginatorChange: this.pageChange
                }
              } data = {this.props.data.data}></NewsList>
            </StyledSection>
					</StyledContent>
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
	return {
		props: {
			data: {data: res.data, total: res.total}
    },
    revalidate: 1,
	}
}


