import Header from '../../components/Header'
import styled from 'styled-components'
import React from 'react'
import Kv from '../../components/Kv'
import Link from 'next/link'
import Footer from '../../components/Footer'
import CoverList from '../../components/CoverList'
import { BANNERS } from '../../shared/config'
import { queryCase } from '../../api/article'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
  padding: 30px 0;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const Nav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(216, 216, 216);
  &>p {
    width: 1136px;
    margin: 0 auto;
  }
`

const getData = async (params?: any) => {
  const res = await queryCase({...params, per_page: 9});
  const json = await res.json()
  const datas = [];
  json.data.data.forEach((item: any) => {
    datas.push({src: item.preview_url, href: "/case/".concat(item.id), id: item.id})
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
            <p><Link href='/'>首页</Link> {'>'} 场景案例</p>
          </Nav>
					<StyledContent>
            <StyledSection>
              <CoverList paginator={
                {
                  total: this.props.data.total,
                  paginatorChange: this.pageChange
                }
              } data = {this.props.data.data}></CoverList>
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
		}
	}
}


