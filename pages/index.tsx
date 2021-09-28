import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { CASE, NEWS, KV_IMAGES } from '../shared/config'
import { Header, Footer, Kv, IndexLable, } from '../components/'
import { Title, Nowrap, Row, Col, } from '../public/styled/styled'
import { queryCase, queryNews } from '../api/article'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease 0s, box-shadow 0.5s ease 0s;
  }
  img:hover {
    transform: scale(1.15);
    box-shadow: rgba(0, 0, 0, 0.637) 0 0 20px 0px;
  }
`

const SectionTitle = styled.h1`
  margin: 0; padding: 0; font-size: 32px; color: #fff; font-weight: bold; position: relative; padding-bottom: 10px;
`;
const SectionDesc = styled.div`
  color: #ccc; font-size: 16px;
  width: 80%;
  p{ margin-top: 32px; text-align: left; line-height: 2.25; }
`

interface isState {
  isWeb: boolean,
}

class App extends React.Component <{case: any, news: any}, isState> {
	public static propTypes = {};
  constructor(props: any) {
    super(props)
    this.state = {
      isWeb: true,
    }
  }
  componentDidMount() {
    this.setState({ isWeb: window.innerWidth > 500, });
  }
  render(): React.ReactElement {
		return (
			<React.Fragment>
				<Header />
				<main>
					<Kv data={KV_IMAGES} with_arrow />
          { this.state.isWeb ?
            <>
              <div style={{ background: 'url("/static/20210625/intro-bg.jpg") no-repeat', backgroundSize: 'cover', }}>
                <Row style={{minWidth: 1200, width: '80%', padding: '30px 0', margin: '0 auto'}}>
                  <Col style={{ lineHeight: 0, flex: 1, }} ><img src='/static/20210625/about-intro.jpg' style={{ height: 560, }} /></Col>
                  <Col style={{ marginLeft: 60, flex: 1,}}>
                    <SectionTitle>品牌介绍</SectionTitle>
                    <SectionDesc>
                      <p>智博士隐形车衣（漆面保护膜）由中国科学院高分子材料团队联合多院所共同研发。中科新材具有超过20年高分子薄膜领域技术积累，上百项新材料技术专利，国际领先的车衣研发水平，铸就智博士傲绝群雄的过硬质量。</p>
                      <p>智博士隐形车衣采用进口旗舰品牌同款TPU原料，中科鼎力打造，相比于国外进口品牌，具有超强的耐候性、耐磨性、耐污性、超高的亮度、超强的划痕自修复功能、具有全新科技生产工艺。</p>
                      <p>智博士隐形车衣，掌握核心科技，让您放心驾驶、安心停靠、省心保值。</p>
                    </SectionDesc>
                  </Col>
                </Row>
              </div>
              <div><img src='/static/20210625/brand.jpg' style={{width: '100%', }} /></div>
              <div><img src='/static/20210625/youshi.jpg' style={{width: '100%', }} /></div>
              <StyledSection>
                <IndexLable title={CASE.cn} en_title={CASE.en} allHref="/case">
                  <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center', }}>
                    {this.props.case.map(item =>  (
                      <Col key={item.id} style={{ width: 'calc(33.33% - 10 / 3 * 1px)', height: '220px', overflow: 'hidden', position: 'relative', marginTop: 5, }}>
                        <ImageContainer>
                          <Link href={item.href}>
                            <a>
                              <img src={item.src} />
                            </a>
                          </Link>
                        </ImageContainer>
                      </Col>
                    ))}
                  </div>
                </IndexLable>
              </StyledSection>
              <StyledContent>
                <StyledSection>
                  <IndexLable title={NEWS.cn} en_title={NEWS.en} allHref="/news">
                    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center', }}>
                      {this.props.news.map(item =>  (
                        <Col key={item.id} style={{ width: '47.5%', whiteSpace: 'nowrap', }}>
                          <Link href={item.href}><a>
                            <Row style={{ justifyContent: 'space-between', borderBottom: '1px dotted #dedede', lineHeight: 3, }}>
                              <Nowrap>{item.title}</Nowrap>
                              <span>{item.created_at}</span>
                            </Row>
                            </a>
                          </Link>
                        </Col>
                      ))}
                    </div>
                  </IndexLable>
                </StyledSection>
            </StyledContent>
            </>
            :
            <>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-intro.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, padding: '0 20px', }}><img src='/static/m/m-intro2.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-brand.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-guard.jpg' style={{width: '100%', }} /></div>
              <div style={{ lineHeight: 0, }}><img src='/static/m/m-youshi.jpg' style={{width: '100%', }} /></div>
              <div style={{ padding: 20, }}>
                <Title>
                  <Row style={{ justifyContent: 'space-between', }}>
                    <div style={{ whiteSpace: 'nowrap', flex: 1, }}>{CASE.cn}<span>{CASE.en}</span></div>
                    <div><a href='/case'>全部案例</a></div>
                  </Row>
                </Title>
                <div style={{ marginTop: 20, }}>
                  <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center', }}>
                    {this.props.case.map(item =>  (
                      <Col key={item.id} style={{ width: 'calc(50% - 15 / 3 * 1px)', height: '84px', overflow: 'hidden', position: 'relative', marginTop: 10, }}>
                        <ImageContainer>
                          <Link href={item.href}>
                            <a>
                              <img src={item.src} />
                            </a>
                          </Link>
                        </ImageContainer>
                      </Col>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ lineHeight: 0, textAlign: 'center', }}><a href='/case'><img src='/static/m/m-morecase.png' style={{width: '15%', }} /></a></div>
              <div style={{ padding: 20, }}>
                <Title>
                  <Row style={{ justifyContent: 'space-between', }}>
                    <div style={{ whiteSpace: 'nowrap', flex: 1, }}>{NEWS.cn}<span>{NEWS.en}</span></div>
                    <div><a href='/news'>全部新闻</a></div>
                  </Row>
                </Title>
                <div style={{ marginTop: 20, }}>
                  <div >
                    {this.props.news.map(item =>  (
                      <Link href={item.href}><a>
                        <Row style={{ justifyContent: 'space-between', color: '#fff', fontSize: 12, borderBottom: '1px dashed #dedede', lineHeight: 3, }}>
                          <Col style={{ flex: 1, }}><Nowrap>{item.title.length > 16 ? (item.title.substr(0, 16)+'...') : item.title}</Nowrap></Col>
                          <Col style={{ letterSpacing: -0.5, }}>{item.created_at}</Col>
                        </Row>
                      </a></Link>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ lineHeight: 0, textAlign: 'center', marginTop: 20, }}><a href='/case'><img src='/static/m/m-contact.png' style={{width: '45%', }} /></a></div>
              <div style={{ padding: 20, fontSize: 12, }}>
                <Row style={{ color: '#ee7500', marginTop: 15, }}><div style={{ width: 50, textAlign: 'center', }}><img src='/static/m/m-tel.png' style={{ height: 21, }} /></div><div><a href='tel:4006099891' style={{color: '#ee7500',}}>400-609-9891</a></div></Row>
                <Row style={{ color: '#ee7500', marginTop: 15, }}><div style={{ width: 50, textAlign: 'center',  }}><img src='/static/m/m-email.png' style={{ height: 21, }} /></div><div><a href='mailto:wanghaic@ctime.net.cn' style={{color: '#ee7500',}}>wanghaic@ctime.net.cn</a></div></Row>
                <Row style={{ color: '#fff', marginTop: 15, }}><div style={{ width: 50, textAlign: 'center',  }}><img src='/static/m/m-position.png' style={{ height: 21, }} /></div><div>北京市海淀区中关村南大街方圆大厦</div></Row>
                <Row style={{ color: '#fff', marginTop: 15, }}><div style={{ width: 50, textAlign: 'center',  }}><img src='/static/m/m-wechat.png' style={{ height: 21, }} /></div><div>微信公众号：智博士隐形车衣</div></Row>
              </div>
            </>
          }
          
				</main>
				<Footer />
			</React.Fragment>
		)
  }
}

export default App

const getIndexCase = async () => {
  const res = await queryCase({ recommend: 1, per_page: 6});
  const json = await res.json()
  const datas = [];
  if (json.result) {
    json.data.data.forEach((item: any) => {
      datas.push({src: item.preview_url, href: "/case/".concat(item.id), id: item.id})
    });
  }
	return {
			data: datas
	}
}

const getIndexNews = async () => {
  // const res = await queryNews({recommend: 1, per_page: 9});
  const res = await queryNews({ recommend: 1, per_page: 10});
  const json = await res.json()
  const datas = [];
  if (json.result) {
    json.data.data.forEach((item: any) => {
      datas.push({title: item.title, created_at: item.created_at, href: "/news/".concat(item.id), id: item.id})
    });
  }
	return {
			data: datas.sort((a, b) => b.order_number - a.order_number)
	}
}

export async function getStaticProps(): Promise<{
}> {
  const caseData = await getIndexCase();
  const newsData = await getIndexNews();
	return {
		props: {
      case: caseData.data,
      news: newsData.data,
    },
    revalidate: 1,
	}
}


