/**
 * 从本地缓存中同步获取指定 key 对应的内容
 * @param {Object} key
 */
export function getStorage(key) {
	try {
		return uni.getStorageSync(key);
	} catch (e) {
		return null;
	}
}

/**
 * 将 value 同步存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 * @param {Object} key
 * @param {Object} value
 */
export function setStorage(key, value) {
	try {
		uni.setStorageSync(key, value);
	} catch (e) {
		return null;
	}
}

/**
 * 从本地缓存中同步移除指定的 key
 * @param {Object} key
 */
export function removeStorage(key) {
	try {
		uni.removeStorageSync(key);
	} catch (e) {
		return null;
	}
}

/**
 * 同步清理本地数据缓存
 */
export function clearStorage() {
	try {
	    uni.clearStorageSync();
	} catch (e) {
	    return null;
	}
}
