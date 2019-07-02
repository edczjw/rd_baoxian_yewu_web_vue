import axios from '../api.request'
export const loginApi = {
    // 登录
    login: (params) => {
        return axios.request({
            url: '/manage/user/login',
            data: params,
            method: 'post'
        })
    },
}