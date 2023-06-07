<template>
	<view>
		<view class="top-box">
			<view class="avatar">
				<image :src="userInfo.avatarUrl"></image>
			</view>
			<view class="nickname">
				{{userInfo.nickName}}
			</view>
		</view>
		<view class="panel">
			<!-- 第一个面板 -->
			<view class="panel-first">
				<view class="panel-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="panel-item">
					<text>14</text>
					<text>收藏的店铺</text>
				</view>
				<view class="panel-item" @click="gotoSC">
					<text>{{total}}</text>
					<text>关注的商品</text>
				</view>
				<view class="panel-item">
					<text>84</text>
					<text>足迹</text>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel-second">
				<text class="title">我的订单</text>
				<view class="container">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png"></image>
						<text>退货/退款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel-third">
				<view class="panel-item">
					<text>收货地址</text>
					<uni-icons type="forward" size="17"></uni-icons>
				</view>
				<view class="panel-item">
					<text>联系客服</text>
					<uni-icons type="forward" size="17"></uni-icons>
				</view>
				<view class="panel-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="forward" size="17"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useUserStore
	} from "@/store/user.js"
	import {
		storeToRefs
	} from "pinia";
	import {
		useSCStore
	} from '../../store/sc.js'

	//使用sc仓库
	const sc = useSCStore()

	// sc仓库的方法
	const {
		total
	} = storeToRefs(sc)

	//用户仓库
	const user = useUserStore()

	let {
		//用户信息
		userInfo
	} = storeToRefs(user)

	const {
		//退出登录
		clearUserInfo
	} = user

	//退出登录
	let logout = async () => {
		const res = await uni.showModal({
			title: "提示",
			content: "确认退出登录吗"
		}).catch(err => err)
		if (res.confirm) {
			clearUserInfo()
		}
	}

	//跳转收藏页
	let gotoSC = () => {
		uni.navigateTo({
			url: "/subpkg/goods_sc/goods_sc"
		})
	}
</script>

<style lang="scss">
	.top-box {
		width: 100%;
		height: 250px;
		background-color: #C00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.avatar {
			width: 100px;
			height: 100px;
			margin-bottom: 15px;
			border-radius: 100%;
			border: 3px solid white;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.nickname {
			color: white;
		}
	}

	.panel {
		transform: translateY(-15px);
		z-index: 999;

		.panel-first {
			margin: 0 14rpx;
			padding: 15rpx 20rpx;
			background-color: white;
			border-radius: 7rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.panel-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				text:nth-of-type(1) {
					font-size: 30rpx;
				}

				text:nth-of-type(2) {
					font-size: 24rpx;
				}
			}
		}

		.panel-second {
			margin: 15rpx 14rpx;
			padding: 15rpx 20rpx;
			background-color: white;
			border-radius: 5rpx;
			display: flex;
			flex-direction: column;

			.title {
				margin-bottom: 15px;
			}

			.container {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 70rpx;
						height: 70rpx;
					}

					text {
						font-size: 24rpx;
					}
				}
			}
		}

		.panel-third {
			margin: 15rpx 14rpx;
			padding: 15rpx 20rpx;
			background-color: white;
			border-radius: 5rpx;

			.panel-item {
				height: 40px;
				font-size: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>