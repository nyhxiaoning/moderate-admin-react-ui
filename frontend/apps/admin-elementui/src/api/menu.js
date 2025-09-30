/*
 * @Author: ningyongheng ningyongheng@jeejio.com
 * @Date: 2024-05-06 13:56:05
 * @LastEditors: ningyongheng ningyongheng@jeejio.com
 * @LastEditTime: 2024-06-11 15:54:18
 * @FilePath: /nest-admin-ruoyi/admin/src/api/menu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// 获取路由
export const getRouters = () => {
	return request({
		url: '/getRouters',
		// url: 'http://127.0.0.1:4523/m2/4436125-4081766-default/171074964',
		method: 'get',
	});
};
