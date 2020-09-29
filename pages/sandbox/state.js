import Link from "next/link";
import MyLayout from "../../components/layout";
import React, { Component, setState } from 'react'
import fetch from 'isomorphic-unfetch'

export default class Read extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      checkedBoxes: []
    }

    this.selectedCheckboxes = new Set()

    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.deletePlaces = this.deletePlaces.bind(this)
    this.fetchPlaces = this.fetchPlaces.bind(this)    
  }

  componentDidMount() {
    this.fetchPlaces()
  }

  fetchPlaces() {       
    fetch("http://localhost:9000/places/all")
    .then(response => response.json())
    .then(places => this.setState({ data: places }, () => console.log(this.state)))
  }

  toggleCheckbox(e, item) {    
    if (this.selectedCheckboxes.has(item.id)) {
      this.selectedCheckboxes.delete(item.id);
    } else {
      this.selectedCheckboxes.add(item.id);
    }    
    let arr = Array.from(this.selectedCheckboxes)
    this.setState({ checkedBoxes: arr });        
  }

  deletePlaces() {        
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ 'ids': this.state.checkedBoxes })
    }
    fetch('http://localhost:9000/places/delete', requestOptions)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('msg').innerHTML = '<span style="color:green;">Places deleted successfully</span>'
          this.fetchPlaces()
        }
      })      
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <div id="msg"></div>
        <ul>
          {this.state && this.state.data &&
            data.map(item =>
              <li>                              
                <input className="form-check-input" type="checkbox" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)} />
                <Link href={"/places/" + item.id}><a>{item.place_name}</a></Link>
              </li>
            )}
        </ul>
        <Link href="/places/create"><a>Create Place</a></Link>
        <button onClick={this.deletePlaces}>Delete</button>        
      </div>
    )
  }
}

Read.Layout = MyLayout;