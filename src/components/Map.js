import React, { Component, Fragment, createRef } from 'react'
import { withTheme } from 'styled-components'
import MapboxGL from 'mapbox-gl'
import { select } from 'd3-selection'

import generateLineGeoJSON from '../lib/generateLineGeoJSON'
import marchingAnts from '../lib/marchingAnts'

import Device from '../icons/device.svg'
import Gateway from '../icons/gateway.svg'
import TTN from '../icons/ttn.svg'

MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class Map extends Component {
  constructor(props) {
    super(props)
    this.mapRef = createRef()
    this.deviceRef = createRef()
    this.gatewayRef = createRef()
    this.TTNRef = createRef()

    this.deviceCoords = [4.8761694, 52.3683326]
    this.gatewayCoords = [4.8927703, 52.3667641]
    this.TTNCoords = [6.857646, 53.4240285]
  }

  componentDidMount() {
    const { link } = this.props.currentStep
    this.map = new MapboxGL.Map({
      container: this.mapRef.current,
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
      center: link === 'the-things-network' ? [6, 53] : [4.888, 52.372],
      zoom: link === 'the-things-network' ? [6.5] : [13],
      interactive: false
    })

    this.map.on('load', () => {
      const container = this.map.getCanvasContainer()
      this.svg = select(container)
        .append('svg')
        .style('position', 'absolute')
        .style('z-index', '0')
        .style('width', '100%')
        .style('height', '100%')

      this.marchingAnts = marchingAnts({ map: this.map, svg: this.svg })
      this.update()
    })
  }

  componentDidUpdate() {
    this.update()
  }

  componentWillUnmount() {
    this.map.remove()
  }

  update = () => {
    switch (this.props.currentStep.link) {
      case 'device':
        this.renderDevice()
        break
      case 'gateway':
        this.renderDevice()
        this.renderGateway()
        break
      case 'the-things-network':
        this.renderTTN()
        break
      case 'application':
        this.renderApplication()
        break
      default:
        this.renderDevice()
        break
    }
  }

  renderMarker = (ref, [lng, lat]) => {
    return new MapboxGL.Marker(ref.current, { anchor: 'center' })
      .setLngLat([lng, lat])
      .addTo(this.map)
  }

  renderDevice = () => {
    const { gatewayMarker, svg, deviceRef, deviceCoords } = this

    if (gatewayMarker && this.props.currentStep.link !== 'gateway') {
      gatewayMarker.remove()
      svg.selectAll('path').remove()
    }

    this.deviceMarker = this.renderMarker(deviceRef, deviceCoords)
  }

  renderGateway = () => {
    const {
      TTNMarker,
      svg,
      map,
      gatewayRef,
      gatewayCoords,
      deviceCoords
    } = this

    if (TTNMarker) {
      TTNMarker.remove()
      svg.selectAll('path').remove()
      map.flyTo({
        center: [4.888, 52.372],
        zoom: [13]
      })
    }

    this.gatewayMarker = this.renderMarker(gatewayRef, gatewayCoords)

    this.marchingAnts({
      data: generateLineGeoJSON({
        from: deviceCoords,
        to: gatewayCoords
      }),
      color: this.props.theme.green
    })
  }

  renderTTN = () => {
    let {
      deviceMarker,
      gatewayMarker,
      svg,
      gatewayRef,
      gatewayCoords,
      map,
      TTNRef,
      TTNCoords
    } = this

    deviceMarker && deviceMarker.remove()
    gatewayMarker
      ? svg.selectAll('path').remove()
      : (gatewayMarker = this.renderMarker(gatewayRef, gatewayCoords))

    map.flyTo({
      center: [6, 53],
      zoom: [6.5]
    })

    this.TTNMarker = this.renderMarker(TTNRef, TTNCoords)

    this.marchingAnts({
      data: generateLineGeoJSON({
        from: gatewayCoords,
        to: TTNCoords
      }),
      color: this.props.theme.red
    })
  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            position: 'relative'
          }}
          ref={this.mapRef}
        />
        <div ref={this.deviceRef}>
          <Device />
        </div>
        <div ref={this.gatewayRef}>
          <Gateway />
        </div>
        <div ref={this.TTNRef}>
          <TTN />
        </div>
      </Fragment>
    )
  }
}
export default withTheme(Map)
