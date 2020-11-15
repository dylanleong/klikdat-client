import React, { useState } from 'react'
import MyLayout from "../../components/layout";
import withoutAuth from '../../hocs/withoutAuth';
import { useToasts } from '../../providers/Toast';
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

function Register() {
    const [form, setState] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: ''
    });

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
            url: process.env.API_HOST + 'users/signup',
            method: 'post',
            headers: {              
              'Content-Type': 'application/json',
            },
            data: form
          }
        const response = await axios(options)
        console.log(response)
        if (response.status === 201) {
            Router.push('/users/login')            
            add("User Created Successfully!")
            
        } else {

        }
    }

    const title = 'Register User'

    return (
        <MyLayout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                                <input name="first_name" className="form-control py-4" id="inputFirstName" type="text" placeholder="Enter first name" onChange={updateField} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                                <input name="last_name" className="form-control py-4" id="inputLastName" type="text" placeholder="Enter last name" onChange={updateField} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                        <input name="username" className="form-control py-4" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" onChange={updateField} />
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                                <input name="password" className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" onChange={updateField} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm Password</label>
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
                                <div className="small"><div className="small"><Link href="/users/login"><a className="nav-link">Login</a></Link></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MyLayout>
    )
}

export default withoutAuth(Register)

