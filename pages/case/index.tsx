import React from 'react'
import Link from 'next/link'
import { CASE, brandData, } from '../../shared/config'
import { Header, Footer, } from '../../components/'
import { Title, CaseBannerContainer, CaseBreadcrumbNav } from '../../public/styled/styled'
import { queryCase } from '../../api/article'

const getData = async (params?: any) => {
  const res = await queryCase({...params, per_page: 9});
  const json = await res.json()
	return {
    total: json.data.total,
    data: json.data.data.map((item: any) => {
      return {
        src: item.preview_url,
        href: `/case/${item.id}`,
        id: item.id,
        title: item.title,
      }
    }),
	}
}

interface isState {
  isWeb: boolean,
}

class App extends React.Component <{data: {data: any, total: number}}, isState> {
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
        <>
          {
            this.state.isWeb ? 
              <>
                <CaseBannerContainer><img src='/static/20210625/case-banner-title.png' /></CaseBannerContainer>
                <CaseBreadcrumbNav><p><Link href='/'>首页</Link> {'>'} 案例中心</p></CaseBreadcrumbNav>
                <main>
                  <div style={{ width: '80%',  margin: '30px auto', textAlign: 'center', }}>
                    {
                      brandData.map(d => (
                        <div style={{display: 'inline-block', position: 'relative', verticalAlign: 'top', width: '110px', height: '100px', margin: '5px', background: '#fff', }} key={d.cn}>
                          <a href={'/tags/'+d.cn} title={d.cn}>
                            <img style={{width: '100%', height: '100%', objectFit: 'contain', }} src={'/static/brandlogo/'+(d.cn)+'.png'} />
                            <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, background: 'rgba(0,0,0,.6)', fontSize: 12, textAlign: 'center', color: '#fff', }}>{d.cn}</div>
                          </a>
                        </div>
                      ))
                    }
                    <div style={{display: 'inline-block', verticalAlign: 'top', width: '110px', height: '100px', margin: '5px', background: 'transparent', }}></div>
                    <div style={{display: 'inline-block', verticalAlign: 'top', width: '110px', height: '100px', margin: '5px', background: 'transparent', }}></div>
                  </div>
                </main>
              </>
            :
            <main>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-case.jpg' style={{width: '100%', }} /></div>
              <div style={{ padding: 20, }}>
                <Title>
                  <div style={{ justifyContent: 'space-between', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', }}>
                    <div style={{ whiteSpace: 'nowrap', flex: 1, }}>{CASE.cn}<span>{CASE.en}</span></div>
                    <div><a href='/case'>全部案例</a></div>
                  </div>
                </Title>
                <div style={{ width: '100%',  margin: '30px auto',  }}>
                  <div style={{ textAlign: 'center', }}>
                    {
                      brandData.map(d => (
                        <div style={{display: 'inline-block', position: 'relative', verticalAlign: 'top', width: '30%', height: '100px', margin: '5px', background: '#fff', }} key={d.cn}>
                          <a href={'/tags/'+d.cn} title={d.cn}><img style={{width: '100%', height: '100%', objectFit: 'contain', }} src={'/static/brandlogo/'+(d.cn)+'.png'} /></a>
                          <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, background: 'rgba(0,0,0,.6)', fontSize: 12, textAlign: 'center', color: '#fff', }}>{d.cn}</div>
                        </div>
                      ))
                    }
                    <div style={{display: 'inline-block', verticalAlign: 'top', width: '30%', height: '100px', margin: '5px', background: 'transparent', }}></div>
                    <div style={{display: 'inline-block', verticalAlign: 'top', width: '30%', height: '100px', margin: '5px', background: 'transparent', }}></div>
                  </div>
                </div>
              </div>
            </main>
          }
        </>
				<Footer />
			</React.Fragment>
		)
  }
}

export default App

export async function getStaticProps(): Promise<{}> {
  const res = await getData();
	return {
		props: {
			data: {data: res.data, total: res.total, }
    },
    revalidate: 1,
	}
}


