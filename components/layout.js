import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }    
    
    state = { showSideNav: false }
    toggleMenu = () => {
        this.setState({
          showSideNav: !this.state.showSideNav
        })
      }

    render() {
        const sideVis = this.state.showSideNav ? 'sb-sidenav-toggled' : '';
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
                <div className={`sb-nav-fixed ${sideVis}`}>
                    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                        <Link href="/"><a className="navbar-brand"><img src="/images/klikdat_logo_empty.png" width="200" height="40"/></a></Link>
                        <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={this.toggleMenu}><i className="fas fa-bars"></i></button>
                        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>

                        <ul className="navbar-nav ml-auto ml-md-0">
                            <li className="nav-item"><Link href="/users/login"><a className="nav-link">log in</a></Link></li>
                            <li className="nav-item"><Link href="/users/register"><a className="nav-link">register</a></Link></li>
                            <li className="nav-item"><Link href="/test"><a className="nav-link">test</a></Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="#">Settings</a><a className="dropdown-item" href="#">Activity Log</a>
                                    <div className="dropdown-divider"></div>                                    
                                    <Link href="/users/logout"><a href="/users/logout" className="dropdown-item">Logout</a></Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div id="layoutSidenav">
                        <div id="layoutSidenav_nav">
                            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                                <div className="sb-sidenav-menu">
                                    <div className="nav">
                                        <div className="sb-sidenav-menu-heading">Core</div>
                                        <a className="nav-link" href="index.html"><div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>Dashboard</a>
                                        <div className="sb-sidenav-menu-heading">Interface</div>
                                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts"><div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>Layouts<div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div></a>
                                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                                <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a></nav>
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
                                                        <a className="nav-link" href="500.html">500 Page</a>
                                                    </nav>
                                                </div>
                                            </nav>
                                        </div>
                                        <div className="sb-sidenav-menu-heading">Addons</div>
                                        <a className="nav-link" href="charts.html"><div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>Charts</a>
                                        <Link href="/tic"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Tic-Tac-Toe</a></Link>
                                        <Link href="/places/read"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Places</a></Link>
                                        <Link href="/sandbox/mapping"><a className="nav-link"><div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>Test - Map</a></Link>
                                    </div>
                                </div>
                                <div className="sb-sidenav-footer">
                                    <div className="small">Logged in as:</div>Start Bootstrap
                            </div>
                            </nav>
                        </div>
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid">
                                    <h1 className="mt-4">Dashboard</h1>
                                    <ol className="breadcrumb mb-4">
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                    {this.props.children}
                                </div>
                            </main>
                            <footer className="py-4 bg-light mt-auto">
                                <div className="container-fluid">
                                    <div className="d-flex align-items-center justify-content-between small">
                                        <div className="text-muted">Copyright &copy; Your Website 2019</div>
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
            </div>
        )
    }
}