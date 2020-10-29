import React from 'react';
import '../styles/global.css'
import 'leaflet/dist/leaflet.css'
import App from 'next/app';
import cookie from 'cookie';
import { AuthProvider } from '../providers/Auth';
import { ToastProvider } from '../providers/Toast';
import jwt_decode from 'jwt-decode'
import axios from 'axios'

// fix Fontawesome bug in NextJS production build. FAS works correctly in dev without these lines
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps, authenticated }) {
    const Layout = Component.Layout ? Component.Layout : React.Fragment    

    return (          
                <AuthProvider authenticated={authenticated}>
                    <Layout>                        
                    <ToastProvider>
                        <Component {...pageProps} />
                    </ToastProvider>
                    </Layout>
                </AuthProvider>            
        )
  }

MyApp.getInitialProps = async appContext => {
    var authenticated = false;
    var jwtExpired = true            
    var jwtVerified = false
    const request = appContext.ctx.req;

    if (request) {
        request.cookies = cookie.parse(request.headers.cookie || '');
        const token = request.cookies.token
        if (token) {
            var rawToken = token.split(" ")[1]

            // check jwt expiry            
            var decodedToken = jwt_decode(rawToken);
            var dateNow = new Date();
            if (decodedToken.exp < dateNow.getTime()) {
                jwtExpired = false
            }
            

            // check jwt valid            
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
                if (response.data.valid === true) {
                    jwtVerified = true
                } else {
                    jwtVerified = false
                }
            }
        }

        if (request.cookies.token != undefined && jwtVerified === true && jwtExpired === false) {
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