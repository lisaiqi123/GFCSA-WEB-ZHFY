<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<text class="u-line-1 title">是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛</text>
		<text class="u-line-1 aa">是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛</text>
		<text class="u-line-1 aa">新增测试</text>
		<u-button @click="setRouter()">点击进入个人中心</u-button>
		<u-button @click="setRouter1()">点击进入地图</u-button>
		<u-button @click="postMenuaa()">post获取mock数据菜单</u-button>
		<u-button @click="getMenuaa()">get获取mock数据菜单</u-button>
		<u-button @click="loginaaa()">获取用户信息</u-button>
		<u-button @click="ceshi()">测试</u-button>
		<u-button class="btn" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">授权手机号并登录</u-button>
		<u-button class="btn" open-type="chooseAddress" @chooseAddress="chooseAddress">位置授权</u-button>
		<p>文字</p>
		<span>文字-span</span>
	</view>
</template>
<script>
	import { postMenu,getMenu } from '@/common/api/home.js';
	import { login } from '@/common/api/login.js';
	export default {
		data() {
			return {
				title: 'Hello',
				value: '',
				columns: [
					['中国', '美国', '日本']
				],
			}
		},
		onLoad() {
		},
		methods: {
			async loginaaa(){
				// let res = await login({requestId:624018});
				this.$store.commit('setUserToken',89)
				// uni.login({
				//   provider: 'weixin',
				//   success: function (loginRes) {
				//     console.log(111,loginRes);
				//     // 获取用户信息
				    
				//   }
				// });
				
				// 首先尝试获取用户信息
				uni.getUserProfile({
				  desc: '用于完善会员资料', // 必填，声明获取用户个人信息后的用途
				  success: (res) => {
				    // 获取成功处理逻辑
				    console.log(res);
				  },
				  fail: (err) => {
				    // 获取失败，可能用户拒绝授权，尝试引导用户到设置页面
				    if (err.errMsg.indexOf('user deny') > -1) {
				      uni.showModal({
				        title: '提示',
				        content: '需要获取您的信息，请确认授权',
				        success: (modalRes) => {
				          if (modalRes.confirm) {
				            // 引导用户到设置页面
				            uni.openSetting();
				          }
				        }
				      });
				    }
				  }
				});
			},
			async getPhoneNumber(e) {
				console.log(e,'手机号授权信息');
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					// 调用后端接口
					let res = await login( {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
					});
					console.log(res,'接口返回信息');
				} else {
					// 用户拒绝授权获取手机号
					console.log('用户拒绝授权获取手机号');
				}
			},
			chooseAddress(e){
				console.log(e,'位置信息');
			},
			async postMenuaa(){
				let res = await postMenu(
					{a:1},
					{
						custom:{auth: true},
					})
				console.log(res,'postMenuaa');
			},
			async getMenuaa(){
				getMenu({
					params:{a:1},
					custom:{auth: true,catch:false},
				}).then((res) => {
					console.log(res);
				}).catch((err) =>{
					console.log(err);
				})
				// console.log(res,'getMenuaa');
			},
			ceshi(){
				console.log("测试")
			},
			setRouter(){
				uni.switchTab({
					url: '/pages/mine/index'
				});
			},
			setRouter1(){
				uni.navigateTo({
					url: '/pages/index/map'
				});
			},
			change(e) {
			  console.log('change', e);
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.aa{
		font-size: 28rpx;
		color: red;
	}
</style>
