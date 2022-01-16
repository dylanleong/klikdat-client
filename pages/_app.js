import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css'
import '../styles/user_global.css'
import 'leaflet/dist/leaflet.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import 'sidebar-skeleton-compostrap/dist/css/sidebar.css'
import 'open-sans-fontface/open-sans.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'sidebar-menu-compostrap/dist/css/sidebar.menu.css'

import App from 'next/app';
import cookie from 'cookie';
import { AuthProvider } from '../providers/Auth';
import { ToastProvider } from '../providers/Toast';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useEffect } from "react";

// fix Fontawesome bug in NextJS production build. FAS works correctly in dev without these lines
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps, authenticated }) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");    
        import("sidebar-skeleton-compostrap/dist/js/sidebar");        
        import("perfect-scrollbar/dist/perfect-scrollbar");
        import("nanobar/nanobar");
        import("sidebar-menu-compostrap/dist/js/sidebar.menu");
    }, []);
         
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