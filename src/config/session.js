import Cookies from 'js-cookie'
import { TOKEN_KEY } from './api'

export default {
  setToken: function (token) {
    Cookies.set(TOKEN_KEY, token)
  },
  clearToken: function () {
    Cookies.remove(TOKEN_KEY)
  },
  isLogin: function () {
    return Cookies.get(TOKEN_KEY)
  },
}
