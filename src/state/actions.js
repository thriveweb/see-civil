import * as actionTypes from './actionTypes'

export const setActiveCompany = payload => {
    return {
        type: actionTypes.SET_ACTIVE_COMPANY,
        payload
    }
}
