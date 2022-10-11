import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
export const getTreeList = () => {
    return axios.get('/tree/getTreeList')
}

export const deleteTreeList = (id) => {
    return axios.get('/tree/deleteTreeList/' + id)
}
export const modifyTreeList = (params) => {
        return axios.post('/tree/modifyTreeList',
            {
                data: params
            }
        )
        }