import App, { AppProps } from 'next/app';
import React from 'react';
import 'antd/dist/antd.css';
// Store

class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
        <Component {...pageProps} />
    );
  }
}

export default MyApp;
