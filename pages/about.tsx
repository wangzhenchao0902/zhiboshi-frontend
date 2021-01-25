import Header from '../components/Header'
import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { showAbout } from '../api/article'
import { List } from 'antd';
import 'antd/dist/antd.css'

const StyledContent = styled.div`
	width: 1136px;
	margin: 20px auto;
  padding: 30px 0;
`

const StyledSection = styled.section`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`

const Content = styled.form`
  padding: 10px 30px 0;
`

const StyledMain = styled.main`
  padding: 60px 0 0;
`

const Left = styled.div`
  width: 180px;
  height: 100%;
  padding: 30px 0;
  background: #ffffff;
`

const Lis = styled(List.Item)<{active: string}>`
  ${props => props.active &&
  css`
      background-color: rgb(234, 67, 53);
      color: #ffffff;
  `}
  justify-content: center;
  cursor: pointer;
`

const Right = styled.div`
  width: 928px;
  height: 100%;
  background: #ffffff;
  min-height: 600px;
`

const Detail: React.FC <{data: {content: string, title: string, created_at: string}}> = (props: {data: {content: string, title: string, created_at: string}}) => {
  const [data, setData] = useState(props.data);
  const [selectItem, setSelectItem] = useState('about');
  const HandleChange = async (path: string) => {
    const res = await getData(path)
    setSelectItem(path);
    setData(res.data);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
      <StyledMain>
        <StyledContent>
          <StyledSection>
            <Left>
            <List>
              <Lis active={selectItem === 'about' ? 'true': undefined} onClick={() => HandleChange('about')}>
                关于我们
              </Lis>
              <Lis active={selectItem === 'contact' ? 'true': undefined}  onClick={() => HandleChange('contact')}>
                联系我们
              </Lis>
              </List>
            </Left>
            <Right>
              <Content dangerouslySetInnerHTML={{__html: data.content}}></Content>
            </Right>
          </StyledSection>
        </StyledContent>
      </StyledMain>
      <Footer />
    </React.Fragment>
  )
}

export default Detail

const getData = async (path: string) => {
  const res = await showAbout(path);
  const json = await res.json()
	return {
			data: json.data
	}
}

export async function getStaticProps(): Promise<{
}> {
  const res = await getData('about');
	return {
		props: {
			data: res.data
		}
	}
}