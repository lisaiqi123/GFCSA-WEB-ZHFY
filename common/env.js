// 统一管理所有地址
const devUrl = 'https://mockapi.eolink.com/QwvnmXtdabc56a51f6294ad62b3b0c485e605f3bdd63ccd';
const proUrl = process.env.VUE_APP_BASE_URL;
const prefix1 = '/api/XXX';
const prefix2 = '/api/XXXX';
 
const config = {
	// 开发环境配置
	development: {
		rootUrl: devUrl,
		imgUrl: devUrl,
		gateway1: prefix1,
		gateway2: prefix2,
	},
	// 生产环境配置
	production: {
		rootUrl: proUrl,
		imgUrl: proUrl,
		gateway1: prefix1,
		gateway2: prefix2,
	}
}
 
export default config[process.env.NODE_ENV];