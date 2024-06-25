/**
 * 用0补齐
 * 例：输入6，输出06
 * @param {Number} value
 */
export function unshiftZero(value) {
	return value > 9 ? value : `0${value}`;
}

/**
 * 对象合并
 * 浅合并：extend({a:1,b:2,c:3},{a:2,d:5})
 * 深度合并：extend(true,{a:1,b:2,c:3},{a:2,d:5,b:{a:123}})
 */
export function extend() {
	var extended = {};
	var deep = false;
	var i = 0;

	// 判断是否为深拷贝
	if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
		deep = arguments[0];
		i++; //如果为深拷贝则初始的i为1或者为0
	}

	// 将对象属性合并到已存在的对象中
	var merge = function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				// 如果属性为对象并且需要深拷贝时则使用函数递归、反之则将当前的属性替换现有的属性
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(extended[prop], obj[prop]);
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// 遍历所有对象属性
	for (; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;
}

/**
 * 将字节byte转换相应单位
 * @param {Number} size
 */
export function calcFileSize(size) {
	if (!size) return '';
	var byte = 1024.00; // byte
	if (size < byte)
		return size + 'B';
	if (size < Math.pow(byte, 2))
		return (size / byte).toFixed(2) + 'KB'; // KB
	if (size < Math.pow(byte, 3))
		return (size / Math.pow(byte, 2)).toFixed(2) + 'MB'; // MB
	if (size < Math.pow(byte, 4))
		return (size / Math.pow(byte, 3)).toFixed(2) + 'G'; // GB
	return (size / Math.pow(byte, 4)).toFixed(2) + 'T'; // TB
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string')) {
			if ((/^[0-9]+$/.test(time))) {
				// support "1548221490638"
				time = parseInt(time)
			} else {
				// support safari
				// https://stackoverflow.com/questions/4310953/invalid-date-in-safari
				time = time.replace(new RegExp(/-/gm), '/');
				// 后台返回数据格式有可能 2021/7/14 09:15:00.0
				if (time.indexOf('.') >= 0) {
					time = time.split('.')[0]
				}
			}
		}

		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}

// 获取明天同一时间
export function getSameTimeOfTomorrow() {
	let now = new Date();
	now.setDate(now.getDate() + 1);
	const tomorrow = parseTime(now, '{y}-{m}-{d} {h}:{i}');
	return tomorrow + ':00';
}

/**
 * 判断是否为空
 * */
export function isNull(value) {
	return (value === '' || value === undefined || value === null || JSON.stringify(value) === "{}");
}

/**
 * 3 转为三
 * */
export function numToUpper() {

}

/**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
export function utf16toEntities(str) {
	let patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
	str = str.replace(patt, function(char) {
		let H, L, code;
		if (char.length === 2) {
			H = char.charCodeAt(0); // 取出高位
			L = char.charCodeAt(1); // 取出低位
			code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
			return '&#' + code + ';';
		} else {
			return char;
		}
	});
	return str;
}

export function uncodeUtf16(str) {
	let reg = /\&#.*?;/g;
	let result = str.replace(reg, function(char) {
		let H, L, code;
		if (char.length == 9) {
			code = parseInt(char.match(/[0-9]+/g));
			H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
			L = (code - 0x10000) % 0x400 + 0xDC00;
			return unescape('%u' + H.toString(16) + '%u' + L.toString(16));
		} else {
			return char;
		}
	});
	return result;
}

/**
 * 深拷贝
 * @param {Object} data
 */
export function deepClone(data) {
	var t = type(data),
		o, i, ni;

	if (t === 'array') {
		o = [];
	} else if (t === 'object') {
		o = {};
	} else {
		return data;
	}

	if (t === 'array') {
		for (i = 0, ni = data.length; i < ni; i++) {
			o.push(deepClone(data[i]));
		}
		return o;
	} else if (t === 'object') {
		for (i in data) {
			o[i] = deepClone(data[i]);
		}
		return o;
	}
}

export function type(obj) {
	var toString = Object.prototype.toString;
	var map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	return map[toString.call(obj)];
}

/* 富文本图片 */
export function ueditorImgShow(e) {
	if (e) {
		let contentimg = e.target.dataset.nodes;
		let imgs = contentimg.match(/<img[^>]+>/g); //把img所有节点的图片选择出来
		if (imgs) {
			let arrImg = [];
			//遍历标签拼拿到你的图片的src里面的内容放在我们数组中
			for (var j = 0; j < imgs.length; j++) {
				imgs[j].replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
					arrImg.push(capture)
				})
			}
			//最后一步就是把我们的所有图片放在预览的api中就可以了
			uni.previewImage({
				urls: arrImg,
			})
		}
	}

	return
}

// 第三方应用打开文件
export function fileThirdShare({
	name,
	url
} = {}) {
	//#ifdef APP-PLUS
	let fileType = name.split('.')[1] || '';
	fileType = fileType.toLowerCase()
	let type = 'text';

	if (uni.getSystemInfoSync().osName = 'android') {
		if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg' || fileType == 'bmp' || fileType == 'gif') {
			type = 'image';
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {
						url = res.tempFilePath;
					}
				}
			})
		}
	}

	plus.share.sendWithSystem({
		type: type,
		content: name,
		href: type == 'text' ? url : '',
		pictures: type == 'image' ? [url] : [],
	}, function() {
		console.log('分享成功');
	}, function(e) {
		console.log('分享失败：' + JSON.stringify(e));
	})
	//#endif
	//#ifndef APP-PLUS
	prevFileLocal(url);
	//#endif
}

// 本地预览
export function prevFileLocal(resUrl) {
	uni.showLoading({
		title: '加载中...'
	})
	uni.downloadFile({
		url: resUrl,
		success: (res) => {
			if (res.statusCode === 200) {
				uni.openDocument({
					filePath: res.tempFilePath,
					success: () => {
						uni.hideLoading();
					}
				})
			} else {
				uni.showToast({
					title: '预览失败，请稍后重试',
					icon: 'none',
				})
			}
		},
		fail: () => {
			uni.showToast({
				title: '预览失败，请稍后重试',
				icon: 'none',
			})
		},
		complete: () => {
			uni.hideLoading();
		}
	})
}
// 判断文件类型
export const getFileTypeShow = (fileType) => {
	fileType = fileType.toLowerCase();
	if (fileType == 'ppt' || fileType == 'pptx') {
		return 'ppt';
	} else if (fileType == 'doc' || fileType == "docx") {
		return 'doc'
	} else if (fileType == 'mp4' || fileType == "mov" || fileType == "flv" || fileType == "rmvb" || fileType ==
		"avi") {
		return 'mp4'
	} else if (fileType == 'xlsx' || fileType == 'xls') {
		return 'xls'
	} else if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg' || fileType == 'bmp' || fileType ==
		'gif') {
		return 'png'
	} else if (fileType == 'pdf') {
		return 'pdf'
	} else if (fileType == 'txt') {
		return 'txt'
	} else if (fileType == 'ai') {
		return 'ai'
	} else if (fileType == 'psd') {
		return 'wav'
	} else if (fileType == 'zip' || fileType == 'rar') {
		return 'zip'
	} else if (fileType == 'c' || fileType == 'cpp' || fileType == 'cxx' || fileType == 'css' ||
		fileType == 'sql' || fileType == 'java' || fileType == 'php' || fileType == 'js' ||
		fileType == 'jsp' || fileType == 'py' || fileType == 'json' || fileType == 'html' || fileType == 'xml') {
		return 'html'
	} else if (fileType == 'aac' || fileType == 'amr' || fileType == 'ape' || fileType == 'flac' || fileType ==
		'm4r' ||
		fileType == 'mmf' || fileType == 'mp2' || fileType == 'mp3' || fileType == 'ogg' || fileType == 'wav' ||
		fileType == 'wma' || fileType == 'wv') {
		return 'mp3'
	} else {
		return fileType;
	}
}

/**
 * 删除字符串中html标签
 * @param {String} str
 */
export function deleteHtmlTag(str) {
	if (!str) {
		return;
	} else {
		return str.replace(/<[^>]+>/gim, '');
	}
}
