import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api'

export function getCount() {
    return axios.get(`${BASE_URL}/dashboard/count`)
        .then(res => {
            return {
                type: 'COUNT_FETCHED',
                payload: res.data
            }
        })

}