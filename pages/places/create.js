import Head from 'next/head'
import Link from "next/link";
import MyLayout from "../../components/layout";
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

export default class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            place_name: ''
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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        fetch('http://localhost:9000/places/', requestOptions)
            .then((response) => response.json())
            .then(data => {                
                Router.push('/places/read')

            })

    }

    render() {
        const title = 'Create Places'
        return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Places</h3></div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        
                                        <div className="form-group">
                                            <label className="small mb-1" for="inputPlace">Place</label>
                                            <input name="place_name" className="form-control py-4" id="inputPlace" type="text" autoFocus="true" placeholder="Enter Place Name" onChange={this.handleChange}/>
                                        </div>                                        
                                        <div className="form-group mt-4 mb-0">                                            
                                            <input className="btn btn-primary btn-block" type="submit" value="Create Place" />
                                            </div>
                                    </form>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

Create.Layout = MyLayout;
