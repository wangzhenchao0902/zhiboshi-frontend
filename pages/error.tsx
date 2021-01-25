import React, { memo } from 'react'
import Header from '../components/Header'

class Err extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <p>This should not be rendered via SSR</p>
      </div>
    )
  }
}

export default memo(Err)