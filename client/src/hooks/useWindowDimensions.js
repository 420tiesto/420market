import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height
    }
}

function getComputedWidth(isMobile, width) {

    return {
        mapContainerWidth: isMobile ? width : width / 1.5,
        mapControlContainerWidth: isMobile ? width : width / 3,
        detailFieldWidth: isMobile ? width : (width / 3) - 90,
        fieldWidth: isMobile ? width - 20 : (width / 3) - 50
    }
}


export default function useWindowDimensions() {
    const [isMobile, setIsMobile] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
    const [computedWidth, setComputedWidth] = useState(getComputedWidth(isMobile, windowDimensions.width))

    // useEffect(() => {
    //     function handleResize() {
    //         setWindowDimensions(getWindowDimensions())
    //     }

    //     window.addEventListener('resize', handleResize)
    //     return () => window.removeEventListener('resize', handleResize)
    // }, [])

    useEffect(() => {
        const IsMobile = windowDimensions.width <= 840
        if (IsMobile) {
            setIsMobile(IsMobile)
        }
    }, [])

    useEffect(() => {
        setComputedWidth(getComputedWidth(isMobile, windowDimensions.width))
    }, [isMobile])

    return { isMobile, windowDimensions, computedWidth }
}
