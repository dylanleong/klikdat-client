import React, { Component, Profiler } from 'react'
import fetch from 'isomorphic-unfetch'
import MyLayout from "../components/layout";
import withAuth from '../hocs/withAuth';
import cookie from 'js-cookie'

class Test extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {    
    try {
      const response = await fetch(process.env.API_HOST + "api/product", {        
        headers: {
          Accept: "application/json",
          // Authorization: `${localStorage.getItem('token')}`
          Authorization: `${cookie.get('user')}`
        }
      });
      if (!response.ok) {
        console.log(response.status)        
        if (response.status === 429) {
          // displaying "wow, slow down mate"
        } else if (response.status === 401) {
          console.log('Dude - Unauthorized man!')
          return {
            data: [
              {
                id: 1,
                username: "unauthorized!",
                password: "unauthorized!",
              }
            ]
          }
        } else if (response.status === 403) {
          // displaying "hm, what about no?"
        } else {
          // displaying "dunno what happened \_(ツ)_/¯"   
        }
        throw new Error(response);

      }      
      console.log(response.status)
      // console.log(cookie.get('user'))
      const data = await response.json();
      this.setState({ data: data });
      
    } catch (exception) {
      console.log(response.status)
      // handle error
    }
  }

  render() {
    return (
      this.state.data.map((item) => {
        return (
          <MyLayout>
          <div>
            <li>{item.id}</li>
            {/* <li>{item.password}</li> */}
          </div>
          </MyLayout>
        )
      })
    )
  }
}

export default withAuth(Test)