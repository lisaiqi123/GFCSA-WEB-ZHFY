import { setStorage, removeStorage } from '@/common/storage.js';
import { deepClone } from '@/common/helper.js';
import Vue from 'vue';

export default{
    // 定义全局的清理方法
	RESET_ALL_STATE(state, payload) {
		const initState = deepClone(state._initState);
		const retainedState = ['clientId', 'selectSchool', 'requestUrl', 'userInfo', 'downloads','firstUse']; // 登出时需要保留的状态集合
		const modulesFiles = require.context('./modules', true, /\.js$/);
		const moduleNames = modulesFiles.keys().map(item => {
			return item.replace(/^\.\/(.*)\.\w+$/, '$1');
		})
		Object.keys(state).forEach(moduleName => {
			if (moduleNames.indexOf(moduleName) > -1) {
				Object.keys(state[moduleName]).forEach(key => {
					if (retainedState.indexOf(key) < 0) {
						state[moduleName][key] = initState[moduleName][key];
						removeStorage(key);
					}
				})
			} else {
				if (moduleName !== '_initState' && retainedState.indexOf(moduleName) < 0) {
					state[moduleName] = initState[moduleName];
					removeStorage(moduleName);
				}
			}
		})
	},
	// 设置选中的学校
	setSelectSchool(state, info) {
		state.selectSchool = info;
		setStorage('selectSchool', info);
	},
	// 设置默认学期
	setDefaultTermValue(state, value) {
		state.defaultTermValue = value;
		setStorage('defaultTermValue', value);
	},
    // 设置 校历-设置-每周的第一天索引
	setFirstDayIndex(state, value) {
		state.firstDayIndex = value;
		setStorage('firstDayIndex', value);
	},
	// 设置请求地址
	setRequestUrl(state, value) {
		state.requestUrl = value;
		setStorage('requestUrl', value);
	},
	// 设置外部url地址
	setWebview(state, value) {
		state.webview = value;
		setStorage('webview', value);
	},
	// 设置公共分数
	setCommonScore(state, value) {
		state.commonScore = value;
	},
	// 设置登录方式
	setLoginType(state, value) {
		state.loginType = value;
	},
}