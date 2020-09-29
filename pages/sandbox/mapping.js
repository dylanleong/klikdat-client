import dynamic from 'next/dynamic'
import React, { Component } from "react";
import MyLayout from "../../components/layout";

const Map = dynamic(() => import('react-leaflet/lib/Map'), {
  ssr: false
})

const TileLayer = dynamic(() => import('react-leaflet/lib/TileLayer'), {
  ssr: false
})

const Marker = dynamic(() => import('react-leaflet/lib/Marker'), {
  ssr: false
})

const Popup = dynamic(() => import('react-leaflet/lib/Popup'), {
  ssr: false
})

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
      mylat: null,
      mylng: null
    }
  }

  componentDidMount() {
    let self = this
    // const map = this.mapRef.leafletElement;    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.setState({
          mylat: position.coords.latitude,
          mylng: position.coords.longitude
        })
      })
    }
    const L = require('leaflet')    
    L.Icon.Default.imagePath='/images/leaflet/' 
  }

  render() {
    return (
      <ClientOnly>
        <div id="map-container">
          <div id="mapid">
            <Map center={[this.state.mylat, this.state.mylng]} zoom={12} style={{ height: "700px", width: "100%" }} >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[this.state.mylat, this.state.mylng]}>
                <Popup>Your Location<br />Easily customizable.</Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </ClientOnly>
    )
  }
}

Mapping.Layout = MyLayout;