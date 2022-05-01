import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from "react";
import { Breadcrumbs } from './breadcrumbs'
import { userIsAuthenticated } from '../providers/Auth';
import cookie from 'js-cookie'


export const siteTitle = 'klikdat'

export default function Layout(props) {
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
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet"></link>
            </Head>

            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <div className="me-auto" id="navbarLeft">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="navbar-toggler d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </li>
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
                            <li>
                                <button className="btn btn-link btn-sm order-1 order-lg-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#rightMenu" aria-controls="rightMenu" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fas fa-2x fa-filter"></i>
                                </button>

                            </li>
                        </ul>


                    </div>

                </div>
            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header bg-dark text-white">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body bg-dark text-white">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0  align-items-sm-start" id="menu">
                        <li><Link href="/"><a className="nav-link px-0 align-middle"><i className="fas fa-home"></i> <span className="ms-2 d-sm-inline">Home</span></a></Link></li>
                        <li><Link href="/measurements/shoesize/data_table"><a className="nav-link px-0 align-middle"><i className="fas fa-shoe-prints"></i> <span className="ms-2 d-sm-inline">Shoe Size</span></a></Link></li>
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle"><i className="fas fa-play"></i> <span className="ms-2 d-sm-inline">Playpen </span><i className="ms-1 fas fa-angle-down rotate-icon"></i></a>
                            <ul className="collapse  nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li><Link href="/sandbox/chat"><a className="nav-link"><i className="fas fa-comments"></i> <span className="ms-2 d-sm-inline">Chat</span></a></Link></li>                                
                                <li><Link href="/sandbox/fontawesome"><a className="nav-link"><i className="fab fa-font-awesome"></i><span className="ms-2 d-sm-inline">FontAwesome</span></a></Link></li>
                                <li><Link href="/sandbox/mapping"><a className="nav-link"><i className="fas fa-map-marker-alt"></i><span className="ms-2 d-sm-inline">Map</span></a></Link></li>
                                <li><Link href="/sandbox/state"><a className="nav-link"><i className="fas fa-globe-europe"></i><span className="ms-2 d-sm-inline">State</span></a></Link></li>
                                <li><Link href="/sandbox/toast"><a className="nav-link"><i className="fas fa-bread-slice"></i><span className="ms-2 d-sm-inline">Toast</span></a></Link></li>                                                     
                            </ul>
                        </li>
                        <li><Link href="/tic"><a className="nav-link px-0 align-middle"><i className="fas fa-th"></i> <span className="ms-2 d-sm-inline">Tic-Tac-Toe</span></a></Link></li>
                        <li><Link href="/places/read"><a className="nav-link px-0 align-middle"><i className="fas fa-globe-europe"></i> <span className="ms-2 d-sm-inline">Places</span></a></Link></li>                        
                        <li><Link href="/profile"><a className="nav-link px-0 align-middle"><i className="fas fa-user"></i> <span className="ms-2 d-sm-inline">Profile</span></a></Link></li>
                        <li><Link href="/test"><a className="nav-link px-0 align-middle"><i className="fas fa-vial"></i> <span className="ms-2 d-sm-inline">Test</span></a></Link></li>
                    </ul>

                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="rightMenu" aria-labelledby="rightMenuLabel">
                <div className="offcanvas-header bg-dark text-white">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body bg-dark text-white">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <a href="#" className="nav-link align-middle px-0">
                                <i className="fs-4 bi-house"></i> <span className="ms-2 d-sm-inline">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-2 d-sm-inline">Dashboard</span> </a>
                            <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Item</span> 1 </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Item</span> 2 </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-table"></i> <span className="ms-2 d-sm-inline">Orders</span></a>
                        </li>
                        <li>
                            <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                <i className="fs-4 bi-bootstrap"></i> <span className="ms-2 d-sm-inline">Bootstrap</span></a>
                            <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Item</span> 1</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Item</span> 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-grid"></i> <span className="ms-2 d-sm-inline">Products</span> </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Product</span> 1</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span className="d-sm-inline">Product</span> 2</a>
                                </li>                                
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-people"></i> <span className="ms-2 d-sm-inline">Customers</span> </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="layoutSidenav">
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
            </div>

        </div>
    )

}