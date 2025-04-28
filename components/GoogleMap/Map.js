import { useState, useEffect } from 'react'
import styled from 'styled-components'
import GoogleMap from 'google-maps-react-markers'
import mapStyles from 'lib/mapsStyles'
import { mapOffsetCenter } from 'utils/mapOffsetCenter'
import { useMediaQueryContext } from 'context/mediaQuery'

import MarkerIcon from 'assets/map_marker.svg'
import InfoWindow from './InfoWindow'

const ExpeditionMap = ({ locations, projects, toggleBurgerButton }) => {
  const mq = useMediaQueryContext()
  const [infoWindow, setInfoWindow] = useState(null)
  const [markerCenter, setMarkerCenter] = useState(null)
  const [mapZoom, setMapZoom] = useState(0)
  const [mapBounds, setMapBounds] = useState(null)
  const [loadedMap, setLoadedMap] = useState(null)
  const gMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const center = {
    lat: 0,
    lng: 0,
  }
  const zoom = 10

  const bindResizeListener = (map, maps, bounds) => {
    window.addEventListener('resize', () => {
      map.fitBounds(bounds)
      setInfoWindow(null)
    })
  }

  const onGoogleApiLoaded = (map, maps, locations) => {
    const bounds = new window.google.maps.LatLngBounds()

    locations.map((marker) => {
      bounds.extend({
        lat: marker.Latitude,
        lng: marker.Longitude,
      })
    })

    map.fitBounds(bounds)
    setMapBounds(bounds)
    setLoadedMap(map)
    bindResizeListener(map, maps, bounds)
  }

  const handleMarkerClick = (location) => {
    const latLng = { lat: location.Latitude, lng: location.Longitude }
    const mapWidth = loadedMap.getDiv().offsetWidth
    const mapHeight = loadedMap.getDiv().offsetHeight
    const infoWindowWidth = mapWidth / 3
    const offsetX = mq.large ? -mapWidth / 2 + infoWindowWidth : 0
    const offsetY = mq.large ? 0 : mapHeight / 4

    loadedMap.setZoom(16)
    loadedMap.setCenter(latLng)
    setInfoWindow(location)
    mapOffsetCenter(loadedMap, latLng, offsetX, offsetY)
    toggleBurgerButton(false)
  }

  const handleInfoWindowCloseClick = () => {
    toggleBurgerButton(true)
    setInfoWindow(null)
    setMapZoom(null)
    setMarkerCenter(null)
    loadedMap.fitBounds(mapBounds)
  }

  const handleZoomClick = (zoomIn) => {
    if (loadedMap !== null) {
      const currentZoom = loadedMap.getZoom()

      zoomIn
        ? loadedMap.setZoom(currentZoom + 1)
        : loadedMap.setZoom(currentZoom - 1)
    }
  }

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return
      handleInfoWindowCloseClick()
    }

    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <Map>
      <GoogleMap
        apiKey={gMapsKey}
        defaultCenter={center}
        defaultZoom={zoom}
        center={markerCenter}
        zoom={mapZoom}
        options={{
          styles: mapStyles,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          onGoogleApiLoaded(map, maps, locations)
        }}>
        {locations.map((location, index) => {
          return (
            <Marker
              key={index}
              lat={location.Latitude}
              lng={location.Longitude}
              onClick={() => handleMarkerClick(location)}>
              <MarkerIcon />
            </Marker>
          )
        })}
      </GoogleMap>

      <ZoomContainer>
        <Zoom onClick={() => handleZoomClick(false)} />
        <Zoom zoomIn onClick={() => handleZoomClick(true)} />
      </ZoomContainer>

      {infoWindow && (
        <InfoWindow
          location={infoWindow}
          projects={projects}
          onClick={handleInfoWindowCloseClick}
        />
      )}
    </Map>
  )
}

export default ExpeditionMap

const Map = styled.div`
  position: relative;
  width: 100%;
  height: var(--map-height);
`

const Marker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 50px;
  transform: translate(0, -50px);

  svg path {
    transition: fill 0.3s;
  }

  &:hover {
    cursor: pointer;

    svg path {
      fill: #ffe600;
    }
  }
`

const ZoomContainer = styled.div`
  display: flex;
  position: absolute;
  left: var(--gutter);
  bottom: var(--gutter);

  > *:first-child {
    margin-right: 0.15rem;
  }
`

const Zoom = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    background-color: white;
    transition: background-color 0.3s ease;
  }

  &:after {
    content: '';
    width: 1.125rem;
    height: 2px;
  }

  ${({ zoomIn }) =>
    zoomIn &&
    `
    &:before {
      content: '';
      width: 2px;
      height: 1.125rem;
      position: absolute;
      left: 50%;
      transform: translatex(-50%);
    }
  `}

  &:hover {
    background-color: var(--color-dark-gray);

    &:after,
    &:before {
      background-color: white;
    }
  }

  &:first-child {
    margin-right: 0.4rem;
  }
`
