import { combineReducers } from 'redux'

const INITIAL_STATE = {
    data_records: [],
    categorical_records: []
}

const recordsReducer = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        default: 
            return state
    }
}

export default combineReducers({
    records: recordsReducer,
})  

export const addRecord = recordIndex =>(
    {
        type: 'ADD_RECORD',
        payload: {
            
        }
    })
}