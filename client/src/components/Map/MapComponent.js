import React, { useState, useEffect } from 'react'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAction } from '../../hooks/useAction'

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import MarkerControlComponent from './MarkerControlComponent'
import { FaBeer } from 'react-icons/fa'
import './Maps.css'

const center = {
    lat: 40.6943,
    lng: -73.9249
}

const MapComponent = ({ account }) => {
    const google_key = process.env["REACT_APP_GOOGLE_MAP_API_KEY"]
    const { windowDimensions, computedWidth, isMobile } = useWindowDimensions()
    const [accountState, setAccountState] = useState(null)

    const [map, setMap] = useState(null)
    const [newMarkerPositionState, setNewMarkerPositionState] = useState(null)
    const [markerIndexState, setMarkerIndexState] = useState(null)
    const [newMarkersState, setNewMarkersState] = useState([])
    const [saveNewMarkerState, setSaveNewMarkerState] = useState(false)

    const [editMode, setEditMode] = useState(false)
    const [cancelEditMode, setCancelEditMode] = useState(false)

    const google = window.google

    const { storeMarkers } = useTypedSelector((state) => state.user)
    const { fetchUserData, updateMarkerUserData } = useAction()


    useEffect(() => {
        let didCancel = false
        if (!didCancel) {
            fetchUserData(account)
        }
        return () => {
            didCancel = true
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let didCancel = false
        if (!didCancel) {
            setAccountState(account)
        }
        return () => {
            didCancel = true
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let didCancel = false
        if (saveNewMarkerState & !didCancel) {
            updateMarkerUserData(
                account = { accountState },
                newMarkersState
            )
        }
        return () => {
            setSaveNewMarkerState(false)
            didCancel = true
        }
    }, [saveNewMarkerState])

    const containerStyle = {
        width: isMobile ? windowDimensions.width : computedWidth.mapContainerWidth,
        height: '400px'
    }

    const customMarker = {
        title: "My new marker",
        position: {}
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: google_key
    })

    const onLoad = (map) => {
        setMap(map)
    }

    const onUnmount = map => {
        setMap(null)
    }

    const initEventListener = () => {
        if (editMode) {
            google.maps.event.addListener(map, 'click', function (event) {
                addMarker(event.latLng, map)
            })
        }
    }
    useEffect(initEventListener, [editMode])

    const deactivateListener = () => {
        if (cancelEditMode) {
            google.maps.event.clearListeners(map, 'click')
        }
    }

    useEffect(deactivateListener, [cancelEditMode])

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h2 id="firstHeading" class="firstHeading">New Marker</h2>` +
        `<p>for NFT Store by User ${accountState}</p> ` +
        "</div>" +
        "</div>"

    const addMarker = (position, map) => {
        try {

            const marker = new google.maps.Marker({
                position,
                map
            })

            setNewMarkerPositionState(position)

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: containerStyle.width - 50,
            })

            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                })
            })
            setCancelEditMode(true)

        } catch (error) {
            console.log('Marker has not been added to the map!')
        }
    }

    const editModeHandler = () => {
        setEditMode(true)
        setCancelEditMode(false)

    }

    const cancelEditModeHandler = () => {
        setCancelEditMode(true)
        setEditMode(false)
    }

    const saveMarkerHandler = (title) => {
        const newState = newMarkersState ? newMarkersState.concat([
            {
                position: newMarkerPositionState,
                title: title.storeTitleState
            }
        ]) : [
            {
                position: newMarkerPositionState,
                title: title.storeTitleState
            }
        ]
        setNewMarkersState(newState)
        setSaveNewMarkerState(true)
        setEditMode(false)
    }

    const showInfoHandler = (index) => {
        setMarkerIndexState(index)
    }

    const onToggleOpen = () => {
        setMarkerIndexState(null)
    }

    const initMap = (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ fullscreenControl: false }
            }
        >
            {storeMarkers.map((marker, index) =>
                <Marker
                    key={index}
                    options={{ icon: FaBeer }}
                    position={marker.position}
                    onClick={() => { showInfoHandler(index) }}
                >
                    {(markerIndexState == index) &&
                        <InfoWindow onCloseClick={onToggleOpen}>
                            <div>
                                <h2 id="firstHeading" class="firstHeading">{marker.title}</h2>
                                <p>NFT Store by User {accountState}</p>
                            </div>
                        </InfoWindow>}
                </Marker>
            )}
        </GoogleMap >
    )

    return isMobile ? (isLoaded ? (
        <div className='map-control-container-mobile'>
            <div className='map-component-container'>
                {initMap}
            </div>
            <div className='btn-container' style={{ width: windowDimensions.width }}>
                <MarkerControlComponent
                    onEditMode={editModeHandler}
                    onCancelEditMode={cancelEditModeHandler}
                    onSaveMarker={(title) => saveMarkerHandler(title)} o
                />
            </div>
        </div>
    ) : <></>) : (isLoaded ? (
        <div className='map-control-container'>
            <div className='map-component-container'>
                {initMap}
            </div>
            <div className='btn-container' style={{ width: computedWidth.mapControlContainerWidth }}>
                <MarkerControlComponent
                    onEditMode={editModeHandler}
                    onCancelEditMode={cancelEditModeHandler}
                    onSaveMarker={(title) => saveMarkerHandler(title)} o
                />
            </div>
        </div>
    ) : <></>)
}

export default React.memo(MapComponent)