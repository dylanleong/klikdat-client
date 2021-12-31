import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from "react";
import { Breadcrumbs } from './breadcrumbs'
import { userIsAuthenticated } from '../providers/Auth';
import cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

export const siteTitle = 'klikdat'

export default function Layout(props) {
    // left sidebar
    const [showSideNav, setSideNav] = useState(true);
    const [sideVis, setSideVis] = useState('');

    const toggleMenu = () => {
        setSideNav(!showSideNav)
        setSideVis(showSideNav ? 'sb-sidenav-toggled' : '')
        console.log(showSideNav)
        console.log(sideVis)
    }

    // right sidebar
    const [showRightNav, setRightNav] = useState(true);
    const [rightVis, setRightVis] = useState('');

    const toggleRightMenu = () => {
        setRightNav(!showRightNav)
        setRightVis(showRightNav ? 'sb-rightnav-toggled' : '')
        console.log(showRightNav)
        console.log(rightVis)
    }


    const [loading, setLoading] = useState(false)

    const handleSpinner = () => {
        setLoading(!loading)
        console.log('Spinner is toggled')
        console.log(loading)
    }

    const d = new Date()
    const cYear = d.getFullYear()
    const myBread = Breadcrumbs()

    const auth = userIsAuthenticated()

    var initial = String
    if (auth === true) {
        initial = cookie.get('first_name')
        if (typeof initial !== 'undefined') {
            initial = initial.substring(0, 1)
        }
    }
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="klikdat ltd"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossOrigin="anonymous"></script>
                <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossOrigin="anonymous"></script>
                <script type="text/javascript" src="/scripts.js"></script>
                <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossOrigin="anonymous"></script>
                {/* <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script> */}

            </Head>

            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
                <div className="container-fluid">


                    <div className="me-auto" id="navbarLeft">
                        <ul className="navbar-nav">
                            <li className="nav-item w-25">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <picture className="order-0 order-lg-0">
                                            <source srcSet="/images/klikdat_logo_empty.png" type="image/jpeg" media="(min-width: 400px)" width="100%" height="45px" alt="big" />
                                            <source srcSet="/images/k_cropped.png" type="image/jpeg" media="(min-width: 360px)" width="100%" height="45px" alt="small" />
                                            <img src="/images/k_cropped.png" min-width="360px" width="100%" height="45px" alt="backup" className="d-inline-block align-top" />
                                        </picture>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="navbar-toggler d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link btn-sm" id="jobs"><i className="fas fa-2x fa-briefcase"></i></button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link btn-sm order-3 order-lg-3" id="properties"><i className="fas fa-2x fa-home"></i></button>

                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link btn-sm order-4 order-lg-4" id="properties"><i className="fas fa-2x fa-car"></i></button>
                            </li>
                        </ul>
                    </div>
                    <div className="ms-auto" id="navbarRight">
                        <button className="btn btn-link btn-sm order-1 order-lg-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#rightMenu" aria-controls="rightMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-2x fa-filter"></i>
                        </button>

                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                        </div>

                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="rightMenu" aria-labelledby="rightMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                        </div>

                </div>
            </div>




        </div>
    )

}