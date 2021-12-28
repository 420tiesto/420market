import React, { useState } from 'react'
import './Maps.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const MarkerControlComponent = ({ onEditMode, onCancelEditMode, onSaveMarker }) => {

    const { isMobile, computedWidth } = useWindowDimensions()

    const [markerActiveState, setMarkerActiveState] = useState(false)
    const [storeTitleState, setStoreTitleState] = useState("")

    const activeMarkerHandler = () => {
        onEditMode()
        setMarkerActiveState(true)
    }

    const saveMarkersHandler = () => {
        onSaveMarker(storeTitleState)
        setMarkerActiveState(false)
    }

    const cancelMarkersHandler = () => {
        onCancelEditMode()
        setMarkerActiveState(false)
    }

    const markerActiveComponent = (
        <div className='marker-edit-mode-container'>

            <button className="btn" onClick={activeMarkerHandler}>
                <h3>Create Store Marker</h3>
            </button>
        </div>
    )


    const detailLabel = isMobile ? 'At the first, select the place for your Store Marker on the map and save the Store Titles.' : 'At the first, select the place for your Store Marker on the map and save\nthe Store Titles.'

    const editModeComponent = (
        <div className='marker-edit-mode-container'>
            <div className="marker-form-title">
                <h3>Store Markers Editor</h3>
            </div>
            <div className='detail-field' style={{ width: computedWidth.detailFieldWidth }}>
                <h4>{detailLabel}</h4>
            </div>
            <div className="new-title-field" style={{ width: computedWidth.fieldWidth }}>
                <input
                    type="text"
                    className="marker-input"
                    placeholder="Store Title"
                    onChange={(e) => {
                        setStoreTitleState({
                            ...storeTitleState,
                            storeTitleState: e.target.value
                        })
                    }}
                />

            </div>
            <div className='btn-field'>
                <button className="btn" onClick={saveMarkersHandler}>
                    <h3>Save</h3>
                </button>
                <button className="btn" onClick={cancelMarkersHandler}>
                    <h3>Cancel</h3>
                </button>
            </div>

        </div>
    )

    return markerActiveState ? editModeComponent : markerActiveComponent

}

export default MarkerControlComponent
