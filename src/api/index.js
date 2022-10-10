import axios from 'axios'

axios.defaults.baseURL='http://192.168.0.104:3000/'
export const getTreeList=()=>{
    return axios.get('/tree/getTreeList')
}

export const deleteTreeList=(id)=>{
    return axios.get('/tree/deleteTreeList/'+id)
}