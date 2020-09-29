import React from 'react'
import '../styles/global.css'

function App({ Component, pageProps, authenticated }) {
    const Layout = Component.Layout ? Component.Layout : React.Fragment

    return (    
            <Layout>
                <Component {...pageProps} />
            </Layout>
    )

}

export default App