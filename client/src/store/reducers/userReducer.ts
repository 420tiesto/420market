import * as UserTypes from '../types/types.user'

const initialUserState: UserTypes.IUserState = {
    name: '',
    username: '',
    about: '',
    storeMarkers: [],
    loading: false,
    error: null,
    updateSuccess: ''
}

export default function userReducer(
    state = initialUserState,
    action: UserTypes.IUserAction
): UserTypes.IUserState {
    switch (action.type) {
        case UserTypes.UserActionTypes.FETCH_USER_DATA_START:
            return {
                ...state,
                loading: true
            }
        case UserTypes.UserActionTypes.FETCH_USER_DATA_SUCCESS:
            const newState = action.payload
                ? {
                      ...state,
                      name: action.payload.name,
                      username: action.payload.username,
                      about: action.payload.about,
                      storeMarkers: action.payload.storeMarkers,
                      loading: false,
                      error: null
                  }
                : state
            return newState
        case UserTypes.UserActionTypes.FETCH_USER_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UserTypes.UserActionTypes.UPDATE_USER_MARKERS_START:
            return {
                ...state,
                loading: true
            }
        case UserTypes.UserActionTypes.UPDATE_USER_MARKERS_SUCCESS:
            const updateSUccess = action.payload
                ? {
                      ...state,
                      updateSuccess: action.payload,
                      loading: false,
                      error: null
                  }
                : state
            return updateSUccess
        case UserTypes.UserActionTypes.UPDATE_USER_MARKERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
