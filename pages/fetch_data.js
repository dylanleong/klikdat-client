import React, { Component, Profiler } from 'react'
import fetch from 'isomorphic-unfetch'



export default class extends Component {
  static async getInitialProps() {
    const res = await fetch("http://localhost:9000/users/all")
    const data = await res.json()
    console.log(data)
    return {
      data: data
    }
  }

  render () {
    return (      
      this.props.data.map((item) => {
        return (            
            <div>
              <li>{item.username}</li>
              <li>{item.password}</li>
            </div>            
        )
    })            
    )      
  }
}

