import React, { useState, useEffect } from 'react'
import MyLayout from "../../components/layout";
import withAuth from '../../hocs/withAuth';
import axios from 'axios'
import Head from 'next/head'
import Router from 'next/router'
import cookie from 'js-cookie'
import { useToasts } from '../../providers/Toast';

function Profile() {
    const [formState, setFormState] = useState({
        formValues: {
            username: '',
            password: '',
            first_name: '',
            last_name: ''
        }
        
    })
    
    const updateField = ({ target }) => {
        const { formValues } = formState;
        formValues[target.name] = target.value;
        setFormState({ formValues });
        console.log(formState.formValues)
      };

    async function getUser() {
        const options = {
            url: process.env.API_HOST + 'users/' + cookie.get('id'),
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `${cookie.get('token')}`
            }
        }
        const response = await axios(options)        
        
        setFormState({formValues: {...formState.formValues,            
            username: response.data.username,
            first_name: response.data.first_name,
            last_name: response.data.last_name
            }            
        })        
    }                        

    useEffect(() => {
        getUser()
        console.log(formState)
      }, [])    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            url: process.env.API_HOST + `users/${cookie.get('id')}`,
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
            },
            data: formState.formValues
        }
        const response = await axios(options)

        if (response.status === 200) {            
            Router.push('/profile')
        } else {

        }
    }

    const title = 'User Profile'
    function Demo() {
        const { add } = useToasts();
        return <button onClick={() => add("Click to dismiss!")}>Add toast</button>;
      }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>            
            <MyLayout>                
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Profile</h3></div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                                    <input name="first_name" className="form-control py-4" id="inputFirstName" type="text" placeholder="Enter first name" value={formState.formValues.first_name} onChange={updateField} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                                    <input name="last_name" className="form-control py-4" id="inputLastName" type="text" placeholder="Enter last name" value={formState.formValues.last_name} onChange={updateField} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                            <input name="username" className="form-control py-4" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" value={formState.formValues.username} onChange={updateField} />
                                        </div>
                                        <div className="form-group mt-4 mb-0">
                                            <input className="btn btn-primary btn-block" type="submit" value="Update" />
                                        </div>
                                    </form>
                                    <Demo />
                                </div>
                                <div className="card-footer text-center">                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MyLayout>
        </>
    )
}

export default withAuth(Profile)

{/* <div className="container">
                <div className="row justify-content-left">
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
            </div> */}