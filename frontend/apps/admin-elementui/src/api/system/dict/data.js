/*
 * @Author: ningyongheng ningyongheng@jeejio.com
 * @Date: 2024-05-06 13:56:05
 * @LastEditors: ningyongheng ningyongheng@jeejio.com
 * @LastEditTime: 2024-05-06 17:30:26
 * @FilePath: /nest-admin-ruoyi/admin/src/api/system/dict/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// 查询字典数据列表
export function listData(query) {
	return request({
		url: '/system/dict/data/list',
		method: 'get',
		params: query,
	});
}

// 查询字典数据详细
export function getData(dictCode) {
	return request({
		// url: 'http://127.0.0.1:4523/m2/4436125-4081766-default/171076405',
		url: '/system/dict/data/' + dictCode,
		method: 'get',
	});
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
	return request({
		url: '/system/dict/data/type/' + dictType,
		method: 'get',
	});
}

// 新增字典数据
export function addData(data) {
	return request({
		url: '/system/dict/data',
		method: 'post',
		data: data,
	});
}

// 修改字典数据
export function updateData(data) {
	return request({
		url: '/system/dict/data',
		method: 'put',
		data: data,
	});
}

// 删除字典数据
export function delData(dictCode) {
	return request({
		url: '/system/dict/data/' + dictCode,
		method: 'delete',
	});
}
