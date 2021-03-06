import App from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

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
          <Head>
            <title>智博士</title>
            <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
          </Head>
          <Component {...pageProps}>
          </Component>
        </React.Fragment>
      )
  }
}

export default Zbs