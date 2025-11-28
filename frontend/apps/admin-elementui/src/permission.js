/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-06-10 15:51:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-06-16 11:49:14
 * @FilePath: /nest-admin-ruoyi/admin/src/permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'nprogress/nprogress.css';

import { Message } from 'element-ui';
import NProgress from 'nprogress';
import { getToken } from '@/utils/auth';
import { isRelogin } from '@/utils/request';
import router from './router';
import store from './store';

NProgress.configure({ showSpinner: false });

// const whiteList = ['/login', '/register'];
// 不检查cookie：
// TODO:注意：这里不要将权限校验的路由放入：比如index，否则这里死循环，因为一直重复死循环，index路由
const whiteList = ['/login', '/register', '/getInfo', '/getRouters', '/captchaImage', '/logout'];

router.beforeEach((to, from, next) => {
	NProgress.start();
	if (getToken()) {
		debugger;
		to.meta.title && store.dispatch('settings/setTitle', to.meta.title);
		/* has token*/
		if (to.path === '/login') {
			next({ path: '/' });
			NProgress.done();
		} else if (whiteList.indexOf(to.path) !== -1) {
			// 登陆成功获得：Admin—Token，然后这里跳转，但是这里没有用户和路由信息请求，所以这请求一下
			// TODO:因为这里反正是假的：getInfo和getRouters，nestjs这里信息接口写死的数据
			// TODO:真实的情况，这里没有token，还需要拉取。
			// 判断当前用户是否已拉取完user_info信息
			store
				.dispatch('GetInfo')
				.then((res) => {
					isRelogin.show = false;
					const hasPerms = Array.isArray(store.getters.permissions) && store.getters.permissions.length > 0;
					const hasRoles = Array.isArray(store.getters.roles) && store.getters.roles.length > 0;
					if (!hasPerms) {
						store.commit('SET_PERMISSIONS', ['*:*:*']);
					}
					if (!hasRoles) {
						store.commit('SET_ROLES', ['admin']);
					}
					store.dispatch('GenerateRoutes').then((accessRoutes) => {
						// 根据roles权限生成可访问的路由表
						router.addRoutes(accessRoutes); // 动态添加可访问路由表
						next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
					});
				})
				.catch((err) => {
					store.dispatch('FedLogOut').then(() => {
						Message.error(err);
						next({ path: '/' });
					});
				});
		} else {
			if (store.getters.roles.length === 0) {
				isRelogin.show = true;
				// 判断当前用户是否已拉取完user_info信息
				store
					.dispatch('GetInfo')
					.then((res) => {
						isRelogin.show = false;
						const hasPerms = Array.isArray(store.getters.permissions) && store.getters.permissions.length > 0;
						const hasRoles = Array.isArray(store.getters.roles) && store.getters.roles.length > 0;
						if (!hasPerms) {
							store.commit('SET_PERMISSIONS', ['*:*:*']);
						}
						if (!hasRoles) {
							store.commit('SET_ROLES', ['admin']);
						}
						store.dispatch('GenerateRoutes').then((accessRoutes) => {
							// 根据roles权限生成可访问的路由表
							router.addRoutes(accessRoutes); // 动态添加可访问路由表
							next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
						});
					})
					.catch((err) => {
						store.dispatch('FedLogOut').then(() => {
							Message.error(err);
							next({ path: '/' });
						});
					});
			} else {
				next();
			}
		}
	} else {
		debugger;
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next();
		} else {
			next(`/login`); // 否则全部重定向到登录页
			NProgress.done();
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});
