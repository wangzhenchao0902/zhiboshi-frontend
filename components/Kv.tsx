import React, { memo } from 'react'
import styled from 'styled-components'

const KvContainer = styled.div`
  position: relative;
  min-width: 1200px; width: 100%;
  &:hover {
    span {
      display: flex;
    }
  }
  div{ min-width: 1200px; width: 100%; padding-bottom: 50%; }
`

const KvMContainer = styled.div`
  position: relative;
  width: 100%;
  &:hover {
    span {
      display: flex;
    }
  }
  div{ width: 100%; padding-bottom: 150%; }
`

const KvImg = styled.div<{background_image: string, active: boolean}>`
  background: url(${props => props.background_image}) no-repeat;
  background-size: cover;
  background-position: center center;
  display: ${props => props.active ? 'block' : 'none'};
`

const Arrow = styled.span`
  display: none;
  width: 36px;
  height: 48px;
  border-radius: 0px 2px 2px 0px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out 0s;
  cursor: pointer;
`

const ArrowPrev = styled(Arrow)`
  left: 0px;
`

const ArrowNext = styled(Arrow)`
  right: 0px;
  transform: rotate(180deg);
`

const Shadow = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-image: linear-gradient(rgba(239, 244, 245, 0) 0%, rgba(239, 244, 245, 0.5) 41%, rgb(239, 244, 245) 100%);
`

class Kv extends React.Component<{data: Array<string>, with_arrow?: boolean, shadow?: boolean}, {kv_active: number, kv_auto_change_interval_id: number, isWeb: boolean}> {
  constructor(props: any) {
    super(props)
    this.state = {
      kv_active: 0,
      kv_auto_change_interval_id: 0,
      isWeb: true,
    }
  }

  goToNextKv = (increment: number, reset_interval: boolean) => {
    let len = this.props.data.length
    if(!this.state.isWeb) {
      len = 2
    }
    this.setState((state) => {
      const next_index = state.kv_active + increment
      return {
        kv_active: next_index >= len ? 0 : (next_index < 0 ? len - 1 : next_index)
      }
    })

    if (reset_interval) {
      this.resetAutoChangeKv()
    }
  }

  autoChangeKv = () => {
    const interval_id = setInterval(() => this.goToNextKv(1, false), this.state.isWeb ? 1000 * 10 : 1000 * 3)
    this.setState({kv_auto_change_interval_id: interval_id})
  }

  clearAutoChangeKv = () => {
    clearInterval(this.state.kv_auto_change_interval_id)
  }

  resetAutoChangeKv = () => {
    this.clearAutoChangeKv()
    this.autoChangeKv()
  }

  componentDidMount() {
    this.autoChangeKv()
    this.setState({ isWeb: window.innerWidth > 500, });
  }

  componentWillUnmount() {
    this.clearAutoChangeKv() 
  }

  render() {
    return (
      <>
        {
          this.state.isWeb ?
            <KvContainer>
              {this.props.data.map((kv, index) => (
                <KvImg active={this.state.kv_active == index} background_image={kv} key={index}></KvImg>
              ))}
              {this.props.shadow && (<Shadow />)}
              {this.props.with_arrow && 
                <React.Fragment>
                  <ArrowPrev onClick={() => this.goToNextKv(-1, true)}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path stroke="#FFF" strokeWidth="2" d="M16 20l-8-8 8-8" fill="none" fillRule="evenodd"></path></svg>
                  </ArrowPrev>
                  <ArrowNext onClick={() => this.goToNextKv(1, true)}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path stroke="#FFF" strokeWidth="2" d="M16 20l-8-8 8-8" fill="none" fillRule="evenodd"></path></svg>
                  </ArrowNext>
                </React.Fragment>
              }
            </KvContainer>
          :
            <KvMContainer>
              {
                ['/static/m/m-poster1.jpg','/static/m/m-poster2.jpg'].map((kv, index) => (
                  <KvImg active={this.state.kv_active == index} background_image={kv} key={index}></KvImg>
                ))
              }
            </KvMContainer>
        }
      </>
    )
  }
}

export default memo(Kv)