import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MyLayout from "../components/layout";
import withAuth from '../hocs/withAuth';
import cookie from 'js-cookie'

function Test() {
  const [data, setData] = useState([])

  const getProducts = async () => {
    const options = {
      url: process.env.API_HOST + 'api/product',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${cookie.get('token')}`
      }
    }
    const response = await axios(options)        
    setData(response.data)
  }

  useEffect(() => {
    getProducts()      
  }, [])

  return (
    <MyLayout>
      <div>
        {data.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </div>
      <button onClick={() => {
        getProducts()          
      }}>Refresh</button>        
    </MyLayout>
  )
}

export default withAuth(Test)


