import dynamic from 'next/dynamic'
import React, { Component } from "react";
import MyLayout from "../../components/layout";

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), {
  ssr: false
});

const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), {
  ssr: false
});

const Marker = dynamic(() => import('react-leaflet').then((module) => module.Marker), {
  ssr: false
});

const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), {
  ssr: false
});


class ClientOnly extends React.Component {
  state = {
    isClient: false,
  }

  componentDidMount() {
    this.setState({
      isClient: true,
    })
  }

  render() {
    const { isClient } = this.state
    const { children } = this.props

    return isClient ? children : false
  }
}

export default class Mapping extends Component {
  constructor(props) {
    super(props);
    // this.mapRef = React.createRef();
    this.state = {
      mylat: 51.5074,
      mylng: 0.1278
    }
    this.getLocation = this.getLocation.bind(this)
  }

  componentDidMount() {
    let self = this
    // const map = this.mapRef.leafletElement;        
    const L = require('leaflet')    
    L.Icon.Default.imagePath='/images/leaflet/' 
  }

  getLocation() {
    console.log(this)
    let self = this
    // if ("geolocation" in navigator) {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.setState({
          mylat: position.coords.latitude,
          mylng: position.coords.longitude
        })
      })
    }
  }

  render() {
    return (
      <ClientOnly>
        <div id="map-container">
          <div id="mapid">
            <button onClick={this.getLocation}>Get Current Location</button>
            <br/>
            <MapContainer center={[this.state.mylat, this.state.mylng]} zoom={12} style={{ height: "700px", width: "100%" }} 
            key={JSON.stringify([this.state.mylat, this.state.mylng])}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[this.state.mylat, this.state.mylng]}>
                <Popup>Your Location<br />Easily customizable.</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </ClientOnly>
    )
  }
}

Mapping.Layout = MyLayout;