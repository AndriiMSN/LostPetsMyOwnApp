import React, { Component } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import mapStyles from './map.module.scss'

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px'
};


export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: this.props.lat,
        longitude: this.props.lon,
        zoom: 8,
      },
      popupInfo: null
    };
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL

        {...viewport}
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA'}>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <Marker latitude={this.props.lat} longitude={this.props.lon} offsetLeft={-20} offsetTop={-10}>
          <div>There</div>
        </Marker>
      </ReactMapGL>
    );
  }
}