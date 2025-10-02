// TODO:通过写死，这里修改一下：改成token的形式，然后在后端的中间件中验证token的有效性
// Authentication: Bearer <token>
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

/**
 * cookie机制废弃，使用sessionStorage机制存储token，jwt
 */
export function getToken() {
  /* 与后端约定的 Token 存储名称 */
  let currentToken = sessionStorage.getItem('token')
  // return Cookies.get(TokenKey)
  return currentToken
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
