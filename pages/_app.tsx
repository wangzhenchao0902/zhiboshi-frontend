import App from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

const HtmlStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, p, h1, h2, h3, h4, h5 {
    padding: 0;
    margin: 0;
  }
  body {
    background-color: rgb(240, 244, 245);
    height: 500px;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: rgb(31, 31, 31);
    text-decoration: none;
    cursor: pointer;
  }
`
class Zbs extends App {
  render(): React.ReactElement {
      const { Component, pageProps } = this.props;

      return (
        <React.Fragment>
          <HtmlStyle />
          <Component {...pageProps}>
          </Component>
        </React.Fragment>
      )
  }
}

export default Zbs