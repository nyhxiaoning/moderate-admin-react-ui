/*
 * @Author: ningyongheng ningyongheng@jeejio.com
 * @Date: 2024-05-06 13:56:05
 * @LastEditors: ningyongheng ningyongheng@jeejio.com
 * @LastEditTime: 2024-05-06 16:17:23
 * @FilePath: /nest-admin-ruoyi/admin/src/utils/auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie';

// TODO:写死的Admin-Token
const TokenKey = 'Admin-Token';

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token) {
	return Cookies.set(TokenKey, token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
