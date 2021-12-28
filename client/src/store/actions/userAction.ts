import { Dispatch } from 'redux'
import * as UserTypes from '../types/types.user'

import config from '../../helpers/constants'

const axios = require('axios').default

const BASE_URL = config.url.API_URL

//=======================================================================
// MAIN FETCH USER DATA

export const fetchUserData = (account: string) => {
    const url = `${BASE_URL}/api/users/${account}`
    return async (dispatch: Dispatch<UserTypes.IUserAction>) => {
        dispatch(fetchUserDataStart())
        try {
            const { data } = await axios.get(url)
            dispatch(fetchUserDataSuccess(data))
        } catch (error) {
            dispatch(fetchUserDataError(error))
        }
    }
}

//=======================================================================
// Helpers Methods

const fetchUserDataStart = () => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.FETCH_USER_DATA_START
    }
    return result
}

const fetchUserDataSuccess = (payload: UserTypes.IUser) => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.FETCH_USER_DATA_SUCCESS,
        payload
    }
    return result
}

const fetchUserDataError = (error: any) => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.FETCH_USER_DATA_ERROR,
        payload: error
    }
    return result
}

// ========================================================================

interface AccountState {
    accountState: string
}

export const updateMarkerUserData = (account: AccountState, markers: UserTypes.IMarker[]) => {
    const url_get = `${BASE_URL}/api/users/${account.accountState}`
    return async (dispatch: Dispatch<UserTypes.IUserAction>) => {
        dispatch(updateUserDataStart())
        try {
            const { data } = await axios.get(url_get)
            const newMarkers = cocncatMarkers(data.storeMarkers, markers)
            const newUserData = {
                id: account.accountState,
                name: data.name,
                username: data.username,
                about: data.about,
                storeMarkers: newMarkers
            }
            const res = await axios.patch(url_get, newUserData)
            dispatch(updateUserDataSuccess(res.data))
        } catch (error) {
            dispatch(updateUserDataError(error))
        }
    }
}

const cocncatMarkers = (
    array: UserTypes.IMarker[] | null,
    newArray: UserTypes.IMarker[]
): UserTypes.IMarker[] => {
    return array ? array.concat(newArray) : newArray
}

//=======================================================================
// Helpers Update User's Data Methods

const updateUserDataStart = () => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.UPDATE_USER_MARKERS_START
    }
    return result
}

const updateUserDataSuccess = (payload: string) => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.UPDATE_USER_MARKERS_SUCCESS,
        payload
    }
    return result
}

const updateUserDataError = (error: any) => {
    const result: UserTypes.IUserAction = {
        type: UserTypes.UserActionTypes.UPDATE_USER_MARKERS_ERROR,
        payload: error
    }
    return result
}
