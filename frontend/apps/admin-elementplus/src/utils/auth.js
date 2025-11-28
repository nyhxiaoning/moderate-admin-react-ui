// TODO:通过写死，这里修改一下：改成token的形式，然后在后端的中间件中验证token的有效性
// Authentication: Bearer <token>
/**
 * 使用 sessionStorage 存储 token
 */
export function getToken() {
  const currentToken = sessionStorage.getItem('token')
  return currentToken
}

export function setToken(token) {
  sessionStorage.setItem('token', token)
}

export function removeToken() {
  sessionStorage.removeItem('token')
}
