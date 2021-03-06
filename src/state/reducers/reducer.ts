import * as types from '../constans'
import { Actions } from '../actions/actionsInterfaces'
import { Reducer } from 'redux'
import { Charts, TauType } from '../constans/types'

interface State {
    satellitesNames: string[]
    stationsNames: string[]
    tauType: TauType
    selectedSatelliteNames: string[]
    selectedStationName: string
    mapReference: any
    startDate: number
    endDate: number
    chartsToShow: Charts[]
    MADMultiply: number
    zoomFix: number //
}

const initialState: State = {
    stationsNames: [],
    satellitesNames: [],
    tauType: TauType.powerOfTwo,
    selectedSatelliteNames: [],
    selectedStationName: '',
    mapReference: null,
    startDate: +new Date(2014, 0, 1, 0, 0, 0, 0),
    endDate: +new Date(2014, 0, 7, 0, 0, 0, 0),
    chartsToShow: [],
    MADMultiply: 3,
    zoomFix: 1000000000000,
}

const reducer: Reducer<State, Actions> = (
    state = initialState,
    action
): State => {
    switch (action.type) {
        case types.SET_SATELLITES_NAMES:
            return {
                ...state,
                satellitesNames: action.satellitesNames,
            }
        case types.SET_STATIONS_NAMES:
            return {
                ...state,
                stationsNames: action.stationsNames,
            }
        case types.SET_SELECTED_STATION_NAME:
            return {
                ...state,
                selectedStationName: action.selectedStationName,
                selectedSatelliteNames: [],
            }
        case types.SET_SELECTED_SATELLITE_NAMES:
            return {
                ...state,
                selectedSatelliteNames: action.selectedSatelliteNames,
                selectedStationName: '',
            }
        case types.SET_TAU_TYPE:
            return {
                ...state,
                tauType: action.tauType,
            }
        case types.SET_MAP_REFERENCE:
            return {
                ...state,
                mapReference: action.mapReference,
            }
        case types.SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate,
            }
        case types.SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate,
            }
        case types.SET_CHARTS_TO_SHOW:
            return {
                ...state,
                chartsToShow: action.chartsToShow,
            }
        case types.SET_MAD_MULTIPLY:
            return {
                ...state,
                MADMultiply: action.MADMultiply,
            }
        default:
            return state
    }
}

export default reducer
