<template>
	<view>
		<view class="address-container">
			<button @click="addAddress" v-if="JSON.stringify(address) === '{}'" type="primary" size="mini"
				class="address-button">请选择收货地址</button>
			<view @click="addAddress" v-else class="address-info">
				<view class="row1">
					<text>收货人：{{address.userName}}</text>
					<text>电话：{{address.telNumber}}</text>
				</view>
				<view class="row2">
					<text>收货地址：</text>
					<text>
						{{completeAddress}}
					</text>
				</view>
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore
	} from "@/store/user.js"
	import {
		useAddress
	} from "@/hooks/address.js"
	
	//购物车仓库
	const user = useUserStore()
	
	const {
		// 手机号码和用户名
		address,
		//完整地址
		completeAddress
	} = storeToRefs(user)
	
	// 添加地址
	const addAddress = useAddress()
</script>

<style lang="scss">
	.address-container {
		width: 100%;
		height: 150rpx;
		position: relative;

		.address-button {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.address-info {
			width: 100%;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 24rpx;

			.row1 {
				margin: 0 15rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 30px;
			}

			.row2 {
				margin: 0 15rpx;

			}
		}

	}

	.address-border {
		width: 100%;
		height: 5px;
	}
</style>