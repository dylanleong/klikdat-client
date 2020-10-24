import React from 'react';
import '../styles/global.css'
import 'leaflet/dist/leaflet.css'
import App from 'next/app';
import cookie from 'cookie';
import { AuthProvider } from '../providers/Auth';
import jwt_decode from 'jwt-decode'
import axios from 'axios'

// fix Fontawesome bug in NextJS production build. FAS works correctly in dev without these lines
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


class MyApp extends App {
    render() {
        const { Component, pageProps, authenticated } = this.props;
        const Layout = Component.Layout ? Component.Layout : React.Fragment
        return (

            <AuthProvider authenticated={authenticated}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        );
    }
}

MyApp.getInitialProps = async appContext => {
    let authenticated = false;
    const request = appContext.ctx.req;

    if (request) {
        request.cookies = cookie.parse(request.headers.cookie || '');
        const token = request.cookies.token
        if (token) {
            // verify jwt token
            let jwtExpired = true
            let jwtVerified = false

            var rawToken = token.split(" ")[1]
            var decodedToken = jwt_decode(rawToken);
            var dateNow = new Date();
            if (decodedToken.exp < dateNow.getTime()) {
                jwtExpired = false
            }
            console.log(jwtExpired)

            const options = {
                url: process.env.API_HOST + 'users/verify',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    'token': rawToken
                }
            }
            const response = await axios(options)

            if (response.status === 200) {
                console.log("the JWT is valid")
            } else {
                console.log("the JWT is NOT valid")
            }
        }

        if (request.cookies.token != undefined) {
            authenticated = !!request.cookies.token;
        } else {
            authenticated = false
        }

    }

    // Call the page's `getInitialProps` and fill `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps, authenticated };
};

export default MyApp;