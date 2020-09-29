import Head from 'next/head'
import Link from "next/link";
import MyLayout from "../../components/layout";
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import withoutAuth from '../../hocs/withoutAuth';
import {AuthContext} from '../../providers/Auth'
import cookie from 'js-cookie'

class Login extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {                
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        fetch(process.env.API_HOST + 'users/signin', requestOptions)
            .then((response) => response.json())
            .then(data => {                
                Router.push('/tic')
                this.context.setAuthenticated(true)
                cookie.set('user',data.token)
            })                        
      }

    render() {
        const title = 'Login'
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <MyLayout>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group"><label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                            <input name="username" className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" onChange={this.handleChange} /></div>
                                        <div className="form-group"><label className="small mb-1" htmlFor="inputPassword">Password</label>
                                            <input name="password" className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" onChange={this.handleChange}/></div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox"><input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" /><label className="custom-control-label" for="rememberPasswordCheck">Remember password</label></div>
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a className="small" href="password.html">Forgot Password?</a>
                                            <input className="btn btn-primary" type="submit" value="Login" />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </MyLayout>
            </>
        )
    }
}

export default withoutAuth(Login)