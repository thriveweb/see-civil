import './Map.scss'

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import _debounce from 'lodash/debounce'

export default class GoogleMap extends Component {
  static defaultProps = {
    apiKey: 'AIzaSyDheQWAg7ict4iFzYP4XYIdfODPonjdK4I',
    lat: -28.106237,
    lng: 153.425939,
    zoom: 15,
    disableDefaultUI: true,
    icon: '/images/see-group-map-marker.svg',
    styles: [{"stylers": [{"hue": "#ff1a00"},{"invert_lightness": true},{"saturation": -100},{"lightness": 33},{"gamma": 0.5}]},{"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#2D333C"}]}]
  }
  mapElement = null
  map = null

  componentDidMount() {
    window.initMap = this.initMap
    if (window.google) this.initMap()
    this.addListeners()
  }

  addListeners = () => {
    if (!this.map) return false
    window.addEventListener('resize', _debounce(this.setMapCenter), 100)
  }

  setMapCenter = () => {
    if (!this.map) return false
    const { lat, lng } = this.props
    const center = { lat, lng }
    this.map.setCenter(center)
  }

  initMap = () => {
    const google = window.google
    const { lat, lng, zoom, disableDefaultUI } = this.props
    const styles = this.props.styles
    const center = { lat, lng }
    const map = new google.maps.Map(this.mapElement, {
      zoom,
      disableDefaultUI,
      styles
    })
    // pan offset
    const icon = this.props.icon
      ? {
        url: this.props.icon
      }
      : ''
    this.marker = new google.maps.Marker({
      position: center,
      icon,
      map
    })

    this.map = map
    this.setMapCenter()
    this.addListeners()
  }

  render() {
    return (
      <div className='GoogleMap--Wrap'>
        <Helmet>
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDheQWAg7ict4iFzYP4XYIdfODPonjdK4I&callback=initMap`}
          />
        </Helmet>
        <div
          className='GoogleMap'
          ref={el => {
            this.mapElement = el
          }}
        />
      </div>
    )
  }
}
