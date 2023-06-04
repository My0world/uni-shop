<template>
	<view class="goods-item">
		<view v-if="radioShow" class="radio">
			<radio @click="radioClick" :checked="goods.goods_state" color="#c00000" /><text></text>
		</view>
		<view class="goods-item-image">
			<image :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-item-text">
			<view class="item-name">
				{{goods.goods_name}}
			</view>
			<view class="item-other">
				<view class="item-price">
					￥ {{toFixed(goods.goods_price)}}
				</view>
				<uni-number-box v-if="numberBoxShow" :min="1" :value="goods.goods_count"
					@change="numClick"></uni-number-box>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,ref
	} from "vue"
	
	//保留小数点后两位
	import toFixed from "../../until/toFixed.js"

	//默认图片
	let defaultPic = ref(
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	)

	//父组件给子组件的数据
	let prop = defineProps({
		//商品
		goods: {
			type: Object,
			default: {}
		},
		//单选按钮的显示
		radioShow: {
			type: Boolean,
			default: false
		},
		//购物车商品数量的显示
		numberBoxShow: {
			type: Boolean,
			default: false
		}
	})

	//调用父组件的事件
	const emit = defineEmits(['radio-Change', 'num-change']);

	//勾选商品的事件
	let radioClick = () => {
		emit("radio-Change", {
			goods_id: prop.goods.goods_id,
			goods_state: !prop.goods.goods_state
		})
	}

	//加减数字的事件
	let numClick = (e) => {
		emit("num-change", {
			goods_id: prop.goods.goods_id,
			goods_count: e
		})
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 145px;
		background-color: white;
		border: 1px solid #eee;

		.radio {
			margin-left: 15rpx;
		}

		.goods-item-image {
			width: 200rpx;
			margin-left: 15rpx;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.goods-item-text {
			margin-left: 15rpx;
			margin-right: 15rpx;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.item-name {
				margin-bottom: 5px;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
				font-size: 24rpx;


			}

			.item-other {
				display: flex;
				justify-content: space-between;

				.item-price {
					color: red;
					font-size: 37rpx;
				}
			}

		}
	}
</style>