import Head from 'next/head'
import Link from "next/link";
import MyLayout from "../../components/layout";
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

export default class Register extends React.Component {
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
        fetch(process.env.API_HOST + 'users/signup', requestOptions)
            .then((response) => response.json())
            .then(data => {
                alert(data.token)
                localStorage.setItem("token", data.token)
                Router.push('/tic')

            })

    }

    render() {
        const title = 'Register'
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputFirstName">First Name</label>
                                                    <input name="firstname" className="form-control py-4" id="inputFirstName" type="text" placeholder="Enter first name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputLastName">Last Name</label>
                                                    <input name="lastname" className="form-control py-4" id="inputLastName" type="text" placeholder="Enter last name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="small mb-1" for="inputEmailAddress">Email</label>
                                            <input name="username" className="form-control py-4" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputPassword">Password</label>
                                                    <input name="password" className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputConfirmPassword">Confirm Password</label>
                                                    <input className="form-control py-4" id="inputConfirmPassword" type="password" placeholder="Confirm password" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mt-4 mb-0">                                            
                                            <input className="btn btn-primary btn-block" type="submit" value="Create Account" />
                                            </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="small"><a href="register.html">Have an account? Go to login</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

Register.Layout = MyLayout;
