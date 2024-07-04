<template>
	<view class="content">
		<!-- <web-view style="position: fixed;top: 0;z-index: 100;" src="https://120.209.164.241:8889/webrtc/web/index.html#/"></web-view> -->
		<!-- 图片相对路径的使用 -->
		<image class="logo" src="/static/logo.png"></image>
		<!-- 使用路由跳转功能 -->
		<u-button @click="setRouter()">点击进入个人中心</u-button>
		<u-button @click="setRouter1()">点击进入地图</u-button>
		
		<!-- 手机号授权getPhoneNumber 目前针对非个人开发者，且完成了认证的小程序开放 -->
		<u-button class="btn" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">授权手机号并登录 个人的不支持</u-button>
		
		<!-- 暂只针对如下类目的小程序开放，看文档https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html
		 个人小程序不支持，需要先通过类目审核，再在小程序管理后台 -->
		<u-button @click="getLocation()">获取位置个人小程序不支持</u-button>
		
		<u-button @click="loginaaa()">获取用户信息</u-button>
		<u-button v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</u-button>
		<view v-else>请升级微信版本</view>
		<!-- 获取用户头像和昵称 -->
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="avatarUrl"></image>
		</button> 
		用户昵称：<input type="nickname" class="weui-input" placeholder="请输入昵称"/>
		<!-- 测试使用封装的请求方法 -->
		<u-button @click="postMenuaa()">post获取mock数据菜单</u-button>
		<u-button @click="getMenuaa()">get获取mock数据菜单</u-button>
		<!-- <u-button class="btn" open-type="chooseAddress" @chooseAddress="chooseAddress">位置授权</u-button> -->
	</view>
</template>
<script>
	import { postMenu,getMenu } from '@/common/api/home.js';
	import { login } from '@/common/api/login.js';
	const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	export default {
		data() {
			return {
				avatarUrl: defaultAvatarUrl,//微信头像
				canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断是否可以用授权用户信息
				title: 'Hello',
				value: '',
				columns: [
					['中国', '美国', '日本']
				],
			}
		},
		onLoad() {
			// 查看是否授权
			wx.getSetting({
				success (res){
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						wx.getUserInfo({
							success: function(res) {
								console.log(res.userInfo,11111111111)
							}
						})
					}
				}
			})
		},
		methods: {
			bindGetUserInfo (e) {
				console.log(e.detail.userInfo)
			},
			async loginaaa(){
				// let res = await login({requestId:624018});
				// this.$store.commit('setUserToken',89)
				// uni.login({
				//   provider: 'weixin',
				//   success: function (loginRes) {
				//     console.log(111,loginRes);
				//     // 获取用户信息
				    
				//   }
				// });
				
				// 首先尝试获取用户信息
				
				uni.getSetting({
				  success(res) {
						console.log(res);
				    if (!res.authSetting['scope.userInfo']) {
				      // 还未授权，需要用户确认
				      uni.authorize({
				        scope: 'scope.userInfo',
				        success() {
				          // 用户已授权，可以获取用户信息
				          uni.getUserProfile({
										desc: '获取你的昵称、头像、地区及性别', // 必填，声明获取用户个人信息后的用途
				            success: function(info) {
				              // 获取用户信息成功
											console.log(info,'获取用户信息');
				            },
										fail: (err) => {
											console.log(err,'获取用户信息err');
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
				        fail() {
				          // 用户拒绝授权
				          uni.showModal({
				            title: '用户授权提示',
				            content: '如需正常使用该功能，请按确定并在设置中允许获取您的信息',
				            success: function(res) {
				              if (res.confirm) {
				                // 引导用户去设置中开启权限
				                uni.openSetting();
				              }
				            }
				          });
				        }
				      });
				    }else{
							uni.getUserInfo({
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
						}
				  },
				});
				
			},
			async getPhoneNumber(e) {
				console.log(e,'手机号授权信息');
			},
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail 
				this.avatarUrl = avatarUrl;
			},
			getLocation(){
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
							uni.getLocation({
							  success: function(info) {
							    console.log(info,'位置信息');
							  }
							});
				    },
						fail() {
							// 用户拒绝授权
							uni.showModal({
								title: '用户授权提示',
								content: '如需正常使用该功能，请按确定并在设置中允许获取您的位置信息',
								success: function(res) {
									if (res.confirm) {
										// 引导用户去设置中开启权限
										uni.openSetting();
									}
								}
							});
						}
				})
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
