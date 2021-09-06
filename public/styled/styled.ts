
import styled from 'styled-components'

export const Title = styled.div`
  margin: 0; padding: 0; font-size: 18px; color: #ee7500; font-weight: bold; position: relative; padding-bottom: 10px;
  span{ color: #999; font-size: smaller; vertical-align: bottom; }
  a{ color: #ee7500; }
  &::after{ content: ''; position: absolute; bottom: 0; left: 0; background: url('/static/m/m-line2.png'); background-size: contain; width: 100%; height: 1px; }
`;

export const Nowrap = styled.span`
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Row = styled.div`
  width: 100%; display: flex; flex-flow: row nowrap; align-items: flex-start; justify-content: flex-start; margin: 0 auto;
`
export const Col = styled.div`
  display: inline-flex; flex-flow: column nowrap; align-items: left; justify-content: center; 
  p{ text-align: center; line-height: 2; }
  a{ color: #dedede; }
  a:hover{ color: #ee7500!important; }
`;

export const ListContainer = styled.div`
	width: 1136px;
	margin: 0 auto;
  padding: 30px 0;
  section { margin-bottom: 30px; }
`

export const Sidebar = styled.div`
  background: #fafafa; padding: 20px;
  width: 200px; margin-right: 20px;
  ul, li { margin: 0; padding: 0; }
  li{  list-style: none; text-align: center; padding: 10px; border-bottom: 1px solid #666; font-size: 18px; }
  a { color: #666; }
  a:hover{ color: #000; }
`;

export const HotNews = styled.div`
  margin-top: 40px;
  li{ line-height: 2; border-bottom: 1px dashed #666; font-size: 12px; }
`;

export const CaseBannerContainer = styled.div`
	width: 100%; min-height: 50vh; display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
  background: url('/static/20210625/case-banner.jpg') no-repeat; background-size: cover; background-position: center center; 
`
export const NewsBannerContainer = styled.div`
	width: 100%; min-height: 50vh; display: flex; flex-flow: row nowrap; align-items: center; justify-content: center;
  background: url('/static/20210625/news-banner.jpg') no-repeat; background-size: cover; background-position: center center; 
`
export const BreadcrumbNav = styled.div`
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

export const CaseBreadcrumbNav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background: #161616;
  &>p {
    width: 1136px;
    margin: 0 auto;
    color: #fff;
  }
  a{ color: #fff; }
`

export const Paginator = styled.div`
  text-align: center;
  padding-top: 20px; padding-bottom: 20px;
`

export const ArtLoading = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

export const ArtTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  display: block;
  line-height: 2;
  color: #fff;
  &>p {
    font-size: 14px;
    color: #646262;
  }
`
export const ArtContent = styled.form`
  padding: 10px 30px 0;
  color: #fff;
  & p:empty{ padding: .75em; }
  img{ max-width: 100%; }
`

export const ArtContainer = styled.main`
  padding: 60px 0 0;
  max-width: 1136px;
  width: 100%;
  margin: 20px auto;
  padding: 60px 0 30px;
  min-height: 600px;
  // background-color: #ffffff;
  section{ white-space: pre-wrap; margin-bottom: 30px; }
`