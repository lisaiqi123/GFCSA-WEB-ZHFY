import {
	getStorage,
	setStorage
} from '@/common/storage.js';
import index from '../index.js';
export default {
	state: {
		wxUserToken: getStorage('wxUserToken') || '', // 用户token
		userInfo: getStorage('userInfo'),
	},

	mutations: {
		// 提交用户token
		setUserToken(state, token) {
			state.wxUserToken = token;
			setStorage('wxUserToken', token);
		},
		// 提交用户token
		setUserInfo(state, info) {
			state.userInfo = info;
			setStorage('userInfo', info);
		},
	},

	actions: {

	},
}
