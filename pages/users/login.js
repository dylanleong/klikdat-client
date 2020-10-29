import React, { useState } from 'react'
import MyLayout from "../../components/layout";
import { useAuth } from '../../providers/Auth';
import withoutAuth from '../../hocs/withoutAuth';
import { useToasts } from '../../providers/Toast';
import axios from 'axios'
import Head from 'next/head'
import Router from 'next/router'
import cookie from 'js-cookie'

function Login() {    
    const { setAuthenticated } = useAuth();

    const [form, setState] = useState({
        username: '',
        password: '',        
    })
    
    const { add } = useToasts();

    const updateField = e => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });        
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            url: process.env.API_HOST + 'users/signin',
            method: 'post',
            headers: {              
              'Content-Type': 'application/json',
            },
            data: form
          }
        const response = await axios(options)
        
        if (response.status === 200) {            
            setAuthenticated(true)
            cookie.set('token',response.data.token)
            cookie.set('id',response.data.id)
            cookie.set('username',response.data.username)
            cookie.set('first_name',response.data.first_name)            
            Router.push('/test')
            add("User Logged in Successfully!")
        } else {
    
        }
    }
    
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
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group"><label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                        <input name="username" className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" autoComplete="on" onChange={updateField} /></div>
                                    <div className="form-group"><label className="small mb-1" htmlFor="inputPassword">Password</label>
                                        <input name="password" className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" autoComplete="on" onChange={updateField}/></div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox"><input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" /><label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label></div>
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

export default withoutAuth(Login)