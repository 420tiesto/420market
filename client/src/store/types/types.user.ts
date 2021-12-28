export interface IMarker {
    title: string
    position: {
        lat: number
        lng: number
    }
}

export interface IUser {
    id: string
    name: string
    username: string
    about: string
    storeMarkers: IMarker[]
}

export interface IUserState {
    name: string
    username: string
    about: string
    storeMarkers: null | IMarker[]
    loading: boolean
    error: null | string
    updateSuccess: null | string
}

export enum UserActionTypes {
    FETCH_USER_DATA_START = 'FETCH_USER_DATA_START',
    FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS',
    FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR',
    UPDATE_USER_MARKERS_START = 'UPDATE_USER_MARKERS_START',
    UPDATE_USER_MARKERS_SUCCESS = 'UPDATE_USER_MARKERS_SUCCESS',
    UPDATE_USER_MARKERS_ERROR = 'UPDATE_USER_MARKERS_ERROR'
}
// ================================================
interface FetchUserDataStart {
    type: UserActionTypes.FETCH_USER_DATA_START
}
interface FetchUserDataSuccess {
    type: UserActionTypes.FETCH_USER_DATA_SUCCESS
    payload?: IUser
}
interface FetchUserDataError {
    type: UserActionTypes.FETCH_USER_DATA_ERROR
    payload: string
}
// ================================================
interface UpdateUserMarkersStart {
    type: UserActionTypes.UPDATE_USER_MARKERS_START
}

interface UpdateUserMarkersSuccess {
    type: UserActionTypes.UPDATE_USER_MARKERS_SUCCESS
    payload: string
}

interface UpdateUserMarkersError {
    type: UserActionTypes.UPDATE_USER_MARKERS_ERROR
    payload: string
}
// ================================================
export type IUserAction =
    | FetchUserDataStart
    | FetchUserDataSuccess
    | FetchUserDataError
    | UpdateUserMarkersStart
    | UpdateUserMarkersSuccess
    | UpdateUserMarkersError
