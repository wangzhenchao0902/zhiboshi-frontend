import Header from '../components/Header'
import styled from 'styled-components'
import React from 'react'
import Kv from '../components/Kv'
import Footer from '../components/Footer'
import IndexLable from '../components/IndexLable'
import CoverList from '../components/CoverList'
import NewsList from '../components/NewsList'
import { INDEX_DESCRIPTIONS, CASE, NEWS } from '../shared/config'
import { KV_IMAGES } from '../shared/config'
import { queryCase, queryNews } from '../api/article'
import Link from 'next/link'

const StyledContent = styled.div`
	width: 1136px;
	margin: 0 auto;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
`

const StyledDescription = styled.div`
	padding: 72px 16px 0px;
  display: flex;
  flex-direction: center;
  &>div {
    width: 33.33%;
    text-align: center;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    h3 {
      font-size: 24px;
      font-weight: bold;
      padding-top: 10px;
      letter-spacing: 1px;
      color: rgb(31, 31, 31);
    }
    p {
      line-height: 24px;
      color: rgb(102, 102, 102);
    }
  }
`

const Row = styled.div`
  width: 100%; display: flex; flex-flow: row nowrap; align-items: flex-start; justify-content: flex-start; margin: 0 auto;
`
const Col = styled.div`
  display: inline-flex; flex-flow: column nowrap; align-items: left; justify-content: center; 
  p{ text-align: center; line-height: 2; }
  a{ color: #dedede; }
  a:hover{ color: #ee7500!important; }
`;
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

// const SectionTitle = styled.h1`
//   margin: 0; padding: 0; font-size: 32px; color: #aa5600; font-weight: bold; position: relative; padding-bottom: 10px;
//   &::before{ content: ''; position: absolute; left: 0; bottom: 0; width: 40px; height: 2px; background: #757575; }
// `;
// const SectionDesc = styled.div`
//   color: #fff;
//   p{ margin-top: 20px; text-align: left; line-height: 3; }
// `

const SectionTitle = styled.h1`
  margin: 0; padding: 0; font-size: 32px; color: #fff; font-weight: bold; position: relative; padding-bottom: 10px;
`;
const SectionDesc = styled.div`
  color: #ccc; font-size: 16px;
  width: 80%;
  p{ margin-top: 32px; text-align: left; line-height: 2.25; }
`

const Nowrap = styled.span`
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`

class App extends React.Component <{case: any, news: any}> {
	public static propTypes = {};
  render(): React.ReactElement {
		return (
			<React.Fragment>
				<Header />
				<main>
					<Kv data={KV_IMAGES} with_arrow />
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
            {/* <Row style={{minWidth: 1200, width: '80%', padding: '30px 0', margin: '0 auto'}}>
              <Col style={{ lineHeight: 0, flex: 1, }} ><img src='/static/20210625/intro.jpg' style={{ height: 560, }} /></Col>
              <Col style={{ marginLeft: 20, flex: 1,}}>
                <SectionTitle>DRZ智博士</SectionTitle>
                <SectionDesc>
                  <p>智博士隐形车衣（漆面保护膜）由中国科学院高分子材料团队联合多院所共同研发。中科新材具有超过20年高分子薄膜领域技术积累，上百项新材料技术专利，国际领先的车衣研发水平，铸就智博士傲绝群雄的过硬质量。</p>
                  <p>智博士隐形车衣采用进口旗舰品牌同款TPU原料，中科鼎力打造，相比于国外进口品牌，具有超强的耐候性、耐磨性、耐污性、超高的亮度、超强的划痕自修复功能、具有全新科技生产工艺。</p>
                  <p>智博士隐形车衣，掌握核心科技，让您放心驾驶、安心停靠、省心保值。</p>
                  <p>智博士隐形车衣，中国高科技车衣第一品牌, 为您带来超凡体验。</p>
                </SectionDesc>
              </Col>
            </Row> */}
          </div>
					{/* <StyledContent>
            <StyledSection>
              <StyledDescription>
                <div>
                  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5528" width="64" height="64"><path d="M501.333333 981.333333c-106.666667 0-192-85.333333-192-192V544c0-12.8 8.533333-21.333333 21.333334-21.333333s21.333333 8.533333 21.333333 21.333333V789.333333c0 83.2 66.133333 149.333333 149.333333 149.333334s149.333333-66.133333 149.333334-149.333334c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333c0 106.666667-85.333333 192-192 192zM672 526.933333c-12.8 0-21.333333-8.533333-21.333333-21.333333V256c0-83.2-66.133333-149.333333-149.333334-149.333333s-149.333333 66.133333-149.333333 149.333333c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333c0-106.666667 85.333333-192 192-192s192 85.333333 192 192v249.6c0 10.666667-8.533333 21.333333-21.333333 21.333333z" p-id="5529" fill="#1f1f1f"></path><path d="M234.666667 714.666667c-106.666667 0-192-85.333333-192-192s85.333333-192 192-192h245.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333H234.666667c-83.2 0-149.333333 66.133333-149.333334 149.333334s66.133333 149.333333 149.333334 149.333333c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333334zM768 714.666667H518.4c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333H768c83.2 0 149.333333-66.133333 149.333333-149.333333s-66.133333-149.333333-149.333333-149.333334c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333c106.666667 0 192 85.333333 192 192s-85.333333 192-192 192z" p-id="5530" fill="#1f1f1f"></path></svg>
                  <h3>{INDEX_DESCRIPTIONS.d1.first}</h3>
                  <p>{INDEX_DESCRIPTIONS.d1.second}</p>
                  <p>{INDEX_DESCRIPTIONS.d1.third}</p>
                </div>
                <div>
                  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1100" width="64" height="64"><path d="M911.36 427.37664l40.96-14.88896v-53.73952l-40.96 14.86848v53.76zM931.84 252.57984h-20.48v77.35296l40.96-14.88896v-41.984a20.50048 20.50048 0 0 0-20.48-20.48z" fill="#1f1f1f" p-id="1101"></path><path d="M911.36 897.69984a10.24 10.24 0 0 1-10.24 10.24H122.88a10.24 10.24 0 0 1-10.24-10.24v-778.24a10.24 10.24 0 0 1 10.24-10.24h829.2352v-20.48a20.50048 20.50048 0 0 0-20.48-20.48H102.4a30.76096 30.76096 0 0 0-30.72 30.72v819.2a30.76096 30.76096 0 0 0 30.72 30.72h819.2a30.76096 30.76096 0 0 0 30.72-30.72V456.02816l-40.96 15.01184z" fill="#1f1f1f" p-id="1102"></path><path d="M490.00448 625.4592a21.11488 21.11488 0 0 1-16.384-5.16096l-77.33248-77.33248a22.24128 22.24128 0 0 1 0-31.4368 24.82176 24.82176 0 0 1 16.22016-6.49216 21.23776 21.23776 0 0 1 15.21664 6.49216l58.69568 57.38496a5.12 5.12 0 0 0 7.22944-0.06144l133.36576-134.67648a24.82176 24.82176 0 0 1 16.1792-6.47168 21.1968 21.1968 0 0 1 15.21664 6.49216 22.528 22.528 0 0 1 2.41664 31.68256l-154.43968 154.4192a21.05344 21.05344 0 0 1-16.384 5.18144z" fill="#1f1f1f" p-id="1103"></path><path d="M511.34464 836.15744a28.85632 28.85632 0 0 1-5.85728-0.8192 17.26464 17.26464 0 0 0-3.4816-0.512c-182.33344-61.05088-278.87616-233.20576-277.58592-497.5616a21.58592 21.58592 0 0 1 21.56544-21.58592c132.5056-6.90176 224.21504-88.84224 245.76-125.17376a23.30624 23.30624 0 0 1 19.59936-9.50272 27.48416 27.48416 0 0 1 21.23776 12.61568c22.1184 35.98336 114.97472 117.9648 245.20704 124.7232a20.54144 20.54144 0 0 1 21.79072 20.23424c0 264.54016-96.99328 436.224-280.49408 496.51712a17.89952 17.89952 0 0 1-7.74144 1.06496z m0-596.04992a5.12 5.12 0 0 0-3.6864 1.55648 414.26944 414.26944 0 0 1-235.66336 117.1456 5.14048 5.14048 0 0 0-4.46464 5.18144c4.03456 226.44736 85.48352 370.23744 242.0736 427.4176a5.14048 5.14048 0 0 0 3.50208 0c155.2384-56.68864 236.68736-200.4992 242.0736-427.37664a5.12 5.12 0 0 0-4.52608-5.20192 392.76544 392.76544 0 0 1-235.52-117.06368 5.07904 5.07904 0 0 0-3.70688-1.65888z" fill="#1f1f1f" p-id="1104"></path></svg>
                  <h3>{INDEX_DESCRIPTIONS.d2.first}</h3>
                  <p>{INDEX_DESCRIPTIONS.d2.second}</p>
                  <p>{INDEX_DESCRIPTIONS.d2.third}</p>
                </div>
                <div>
                  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464" width="64" height="64"><path d="M986.386334 446.416306c-19.166525-28.744671-44.135196-46.816259-71.590502-52.198849-6.068206-18.787902-20.967544-33.636075-39.786145-39.622416-9.117658-88.49552-49.947576-170.329317-115.561969-231.195569-68.060095-63.137992-156.698878-97.909937-249.594615-97.909937-92.783173 0-181.350324 34.700313-249.389954 97.715509-65.726957 60.876486-106.648972 142.792147-115.756397 231.389998-18.818601 5.986341-33.728172 20.834514-39.796378 39.622416-27.455305 5.382591-52.423977 23.454178-71.590502 52.198849C11.850909 478.619752 0.021489 521.05626 0.021489 565.907771c0 44.831045 11.82942 87.25732 33.298384 119.470999 19.166525 28.754904 44.135196 46.826492 71.590502 52.219315 7.951089 24.620747 31.077809 42.47744 58.307987 42.47744 33.779338 0 61.244876-27.475771 61.244876-61.244876l0-305.845757c0-25.838482-16.065907-47.982828-38.742373-56.967456 8.65717-77.628008 44.841278-149.32084 102.555747-202.778356 60.446697-55.985082 139.138944-86.817298 221.576491-86.817298 82.529645 0 161.293523 30.893614 221.760686 86.99126 57.622372 53.447283 93.734848 125.068484 102.371552 202.614627-22.666232 8.984628-38.742373 31.118741-38.742373 56.957223l0 305.845757c0 26.370601 16.751522 48.89357 40.164768 57.499575-6.109138 80.30907-57.110719 125.938294-142.045133 125.938294l-64.611553 0c-8.442276-23.740704-31.128975-40.778752-57.724703-40.778752l-101.951997 0c-33.769105 0-61.244876 27.475771-61.244876 61.244876s27.475771 61.244876 61.244876 61.244876L571.026348 983.979518c26.595728 0 49.282427-17.038048 57.724703-40.778752l64.611553 0c107.406219 0 176.233793-63.281255 183.028547-166.440753l0.010233 0c18.163685-6.262634 32.489972-20.844747 38.394449-39.161928 27.455305-5.392824 52.423977-23.464411 71.590502-52.219315 21.468964-32.213679 33.298384-74.639954 33.298384-119.470999C1019.684718 521.05626 1007.855298 478.619752 986.386334 446.416306zM183.53099 718.830649c0 11.205203-9.107425 20.312628-20.312628 20.312628-11.19497 0-20.312628-9.107425-20.312628-20.312628 0-11.2973-9.15859-20.466124-20.466124-20.466124-44.165896 0-81.485873-60.651358-81.485873-132.456754s37.319977-132.456754 81.485873-132.456754c11.307533 0 20.466124-9.168824 20.466124-20.466124 0-11.205203 9.117658-20.312628 20.312628-20.312628 11.205203 0 20.312628 9.107425 20.312628 20.312628L183.53099 718.830649zM571.026348 943.04727l-101.951997 0c-11.205203 0-20.312628-9.107425-20.312628-20.312628s9.107425-20.312628 20.312628-20.312628L571.026348 902.422014c11.19497 0 20.312628 9.107425 20.312628 20.312628S582.221318 943.04727 571.026348 943.04727zM897.266597 698.364525c-11.307533 0-20.466124 9.168824-20.466124 20.466124 0 11.205203-9.117658 20.312628-20.312628 20.312628-11.205203 0-20.312628-9.107425-20.312628-20.312628l0-305.845757c0-11.205203 9.107425-20.312628 20.312628-20.312628 11.19497 0 20.312628 9.107425 20.312628 20.312628 0 11.2973 9.15859 20.466124 20.466124 20.466124 44.165896 0 81.485873 60.651358 81.485873 132.456754S941.432493 698.364525 897.266597 698.364525z" p-id="3465" fill="#1f1f1f"></path></svg>
                  <h3>{INDEX_DESCRIPTIONS.d3.first}</h3>
                  <p>{INDEX_DESCRIPTIONS.d3.second}</p>
                  <p>{INDEX_DESCRIPTIONS.d3.third}</p>
                </div>
              </StyledDescription>
            </StyledSection>
          </StyledContent> */}
          <div><img src='/static/20210625/brand.jpg' style={{width: '100%', }} /></div>
          <div><img src='/static/20210625/youshi.jpg' style={{width: '100%', }} /></div>
          <StyledContent>
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
            <script> AOS.init();</script>
					</StyledContent>
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


