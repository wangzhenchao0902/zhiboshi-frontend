import React, { memo } from 'react'
import styled from 'styled-components'

const KvContainer = styled.div`
  position: relative;
  &:hover {
    span {
      display: flex;
    }
  }
  /* @media screen and (max-width: 1440px) { */
    &, div {
      width: 100%;
      height: 400px;
    }
  /* } */
`

const KvImg = styled.div<{background_image: string, active: boolean}>`
  background-image: url(${props => props.background_image});
  background-size: cover;
  background-position: center top;
  display: ${props => props.active ? 'block' : 'none'};
`

const Arrow = styled.span`
  display: none;
  width: 36px;
  height: 48px;
  border-radius: 0px 2px 2px 0px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 216px;
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

class Kv extends React.Component<{data: Array<string>, with_arrow?: boolean, shadow?: boolean}, {kv_active: number, kv_auto_change_interval_id: number}> {
  constructor(props: any) {
    super(props)
    this.state = {
      kv_active: 0,
      kv_auto_change_interval_id: 0
    }
  }

  goToNextKv = (increment: number, reset_interval: boolean) => {
    const len = this.props.data.length
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
    const interval_id = setInterval(() => this.goToNextKv(1, false), 10000)
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
  }

  componentWillUnmount() {
    this.clearAutoChangeKv() 
  }

  render() {
    return (
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
    )
  }
}

export default memo(Kv)