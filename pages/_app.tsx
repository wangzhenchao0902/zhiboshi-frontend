import App from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

const HtmlStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, p, h1, h2, h3, h4, h5 {padding: 0; margin: 0; }
  body {
    background-color: #000;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
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
            <title>智博士-智博士隐形车衣,路博润Tpu隐形车衣-中科院研发,中科制造,中科新材料科技有限公司</title>
            <meta name='keywords' content='智博士,路博润Tpu隐形车衣,中科院研发,智博士隐形车衣,中科制造,中科新材料科技有限公司' />
            <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" name="viewport" />
          </Head>
          <Component {...pageProps}></Component>
        </React.Fragment>
      )
  }
}

export default Zbs