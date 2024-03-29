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
            initial = initial.substring(0,1)
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
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>

            </Head>

            <div className={`sb-nav-fixed ${sideVis} ${rightVis}`}>
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    <Link href="/"><a className="navbar-brand">
                        <picture className="order-0 order-lg-0">
                            <source srcSet="/images/klikdat_logo_empty.png" type="image/jpeg" media="(min-width: 400px)" width="100%" height="45px" alt="big" />
                            <source srcSet="/images/k_cropped.png" type="image/jpeg" media="(min-width: 360px)" width="100%" height="45px" alt="small" />
                            <img src="/images/k_cropped.png" min-width="360px" width="100%" height="45px" alt="backup" className="d-inline-block align-top" />
                        </picture>
                        {/* <img src="/images/klikdat_logo_empty.png" width="100%" height="100%" /> */}
                    </a></Link>

                    <button className="btn btn-link btn-sm order-1 order-lg-1" id="sidebarToggle" onClick={toggleMenu}><i className="fas fa-2x fa-bars"></i></button>
                    <button className="btn btn-link btn-sm order-2 order-lg-2" id="jobs"><i className="fas fa-2x fa-briefcase"></i></button>
                    <button className="btn btn-link btn-sm order-3 order-lg-3" id="properties"><i className="fas fa-2x fa-home"></i></button>
                    <button className="btn btn-link btn-sm order-4 order-lg-4" id="properties"><i className="fas fa-2x fa-car"></i></button>

                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0 order-5 order-lg-5">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>

                    <ul className="navbar-nav ml-auto ml-md-0 order-6 order-lg-6">
                        {auth === false &&
                            <React.Fragment>
                                <li className="nav-item"><Link href="/users/login"><a className="nav-link">login</a></Link></li>
                                <li className="nav-item"><Link href="/users/register"><a className="nav-link">register</a></Link></li>
                            </React.Fragment>
                        }
                        {auth === true &&
                            <React.Fragment>
                                <li className="nav-item"><a className="nav-link">{initial}</a></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-2x"></i></a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                        <Link href="/users/profile"><a className="dropdown-item" href="#">profile</a></Link>
                                        <a className="dropdown-item" href="#">settings</a>
                                        <div className="dropdown-divider"></div>
                                        <Link href="/users/logout"><a className="dropdown-item">logout</a></Link>
                                    </div>
                                </li>                                
                            </React.Fragment>
                        }
                        <button className="btn btn-link btn-sm order-1 order-lg-1" id="rightbarToggle" onClick={toggleRightMenu}><i className="fas fa-2x fa-filter"></i></button>
                    </ul>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <div className="sb-sidenav-menu-heading">Tools</div>                                    
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#measurementsCollapseLayouts" aria-expanded="false" aria-controls="measurementsCollapseLayouts"><div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>Measurements<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                    <div className="collapse" id="measurementsCollapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link href="/measurements/shoesize"><a className="nav-link">Shoe Size</a></Link>                                            
                                        </nav>
                                    </div>
                                    <div className="sb-sidenav-menu-heading">Interface</div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts"><div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>Sandbox<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link href="/sandbox/chat"><a className="nav-link">Chat</a></Link>
                                            <Link href="/sandbox/fontawesome"><a className="nav-link">FontAwesome</a></Link>
                                            <Link href="/sandbox/mapping"><a className="nav-link">Mapping</a></Link>
                                            <Link href="/sandbox/spinner"><a className="nav-link">Spinner</a></Link>
                                            <Link href="/sandbox/state"><a className="nav-link">State</a></Link>
                                            <Link href="/sandbox/toast"><a className="nav-link">Toast</a></Link>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages"><div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>Pages<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">Authentication<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                                <nav className="sb-sidenav-menu-nested nav">
                                                    <a className="nav-link" href="login.html">Login</a>
                                                    <a className="nav-link" href="register.html">Register</a>
                                                    <a className="nav-link" href="password.html">Forgot Password</a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">Error<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                                <nav className="sb-sidenav-menu-nested nav">
                                                    <a className="nav-link" href="401.html">401 Page</a>
                                                    <a className="nav-link" href="404.html">404 Page</a>                                                    
                                                </nav>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="sb-sidenav-menu-heading">Addons</div>
                                    <a className="nav-link" href="charts.html"><div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>Charts</a>
                                    <Link href="/tic"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Tic-Tac-Toe</a></Link>
                                    <Link href="/places/read"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Places</a></Link>
                                    <Link href="/sandbox/mapping"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Test - Map</a></Link>
                                    <Link href="/profile"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Profile</a></Link>
                                    <Link href="/test"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-filter"></i></div>Test</a></Link>
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                {auth === true &&
                                    <React.Fragment>
                                        <p>{cookie.get('first_name')}</p>
                                    </React.Fragment>
                                }
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <div>{myBread}</div>
                                <div>
                                    {loading === true &&
                                        <React.Fragment>
                                            <div>
                                                <Loader handleSpinner={handleSpinner}
                                                    type="Rings"
                                                    color="#00BFFF"
                                                    height={50}
                                                    width={50}

                                                />
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                                {props.children}
                            </div>
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright &copy; klikdat {cYear}</div>
                                    <div>
                                        <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <div id="layoutRightnav_nav">
                        <nav className="sb-rightnav accordion sb-rightnav-dark" id="rightnavAccordion">
                            <div className="sb-rightnav-menu">
                                <div className="nav">
                                    <div className="sb-rightnav-menu-heading">Filter</div>
                                    <a className="nav-link" href="/"><div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>RightBoard</a>
                                    <div className="sb-rightnav-menu-heading">Interface</div>                                                                    
                                </div>
                            </div>                            
                        </nav>
                    </div>
                </div>

            </div>
        </div>
    )

}