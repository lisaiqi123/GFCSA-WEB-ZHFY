<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">多图模式</text>
			<view class="u-demo-block__content">
				<view class="album">
					<view class="album__avatar">
						<image src="/static/logo.png" mode="" style="width: 32px;height: 32px;"></image>
					</view>
					<view class="album__content">
						<u--text text="uView UI" type="primary" bold size="17"></u--text>
						<u--text margin="0 0 8px 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"></u--text>
						<u-album :urls="urls1" keyName="src2"></u-album>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				albumWidth: 0,
				urls1: [{
					src2: 'https://cdn.uviewui.com/uview/album/1.jpg',
				}]
			}
		}
	}
</script>

<style lang="scss">
	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>