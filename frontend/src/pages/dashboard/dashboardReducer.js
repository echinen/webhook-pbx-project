const INITIAL_STATE = { count: { userCount: 0, activeCallsCount: 0, eventCall: {} } }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COUNT_FETCHED':
            return { ...state, count: action.payload.data }
        default:
            return state
    }
}