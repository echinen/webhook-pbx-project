import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../../common/tab/tabReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    //tab: TabReducer
    //form: formReducer,
    //toastr: toastrReducer
})

export default rootReducer