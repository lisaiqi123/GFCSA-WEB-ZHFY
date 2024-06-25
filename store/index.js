import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import user from './modules/user.js';
import { getStorage } from '@/common/storage.js';
import { deepClone } from '@/common/helper.js';

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/);
const _initState = {};

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;

	// 备份初始状态，用于重置
	_initState[moduleName] = deepClone(value.default.state); // 深克隆

	return modules;
}, {})

export default new Vuex.Store({
	state:{
		_initState,
	},
	getters,
	mutations,
	actions,
	modules:{
		user,
	}
})
