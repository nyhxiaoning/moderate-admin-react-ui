import request from '@/utils/request';

// 登录方法
export function login(username, password, code, captchaId) {
	const data = {
		username,
		password,
		code,
		captchaId,
	};
	return request({
		url: '/login',
		headers: {
			isToken: false,
			repeatSubmit: false,
		},
		method: 'post',
		data: data,
	});
}

// 注册方法
export function register(data) {
	return request({
		url: '/register',
		headers: {
			isToken: false,
		},
		method: 'post',
		data: data,
	});
}

// 获取用户详细信息
export function getInfo() {
	return request({
		// TODO: 修改为真实mock接口
		url: '/getInfo',
		// url: 'http://127.0.0.1:4523/m2/4436125-4081766-default/171059466',
		method: 'get',
	});
}

// 退出方法
export function logout() {
	return request({
		url: '/logout',
		method: 'post',
	});
}
// TODO:关闭验证码模块使用功能。
// 获取验证码
export function getCodeImg() {
	return request({
		url: '/captchaImage',
		headers: {
			isToken: false,
		},
		method: 'get',
		timeout: 20000,
	});
}

export function getGenerateCodeImg() {
	return request({
		url: '/captcha/generate',
		headers: {
			isToken: false,
		},
		method: 'get',
		timeout: 20000,
	});
}
