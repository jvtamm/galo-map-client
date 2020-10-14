// import 'nprogress/nprogress.css';
import App from 'next/app';
// import NProgress from 'nprogress';
import React from 'react';
// import Router from 'next/router';

import GlobalStyle from '@styles/GlobalStyles';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());s
// Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Component {...pageProps} />
                <GlobalStyle />
                <div id='modal-root' />
            </>
        );
    }
}
