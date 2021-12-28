import React from 'react'

import MapComponent from '../components/Map/MapComponent'
import '../components/Map/Maps.css'
import useWindowDimensions from '../hooks/useWindowDimensions'

const MapPage = ({ account }) => {
    const { windowDimensions, isMobile } = useWindowDimensions()

    const containerStyle = {
        width: windowDimensions.width,
    }

    return isMobile ? (
        <div className='map-wrapper-mobile' style={containerStyle}>
            <MapComponent account />
        </div>

    ) : (
        <div className='map-wrapper' style={containerStyle}>
            <MapComponent account={account} />
        </div>
    )
}

export default MapPage
