<template>
	<view class="cart-cantainer" v-if="cartList.length !== 0">
		<Address></Address>
		<!-- 标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="25"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 购物车列表 -->
		<view class="cart-list">

			<uni-swipe-action>
				<block v-for="i in cartList" :key="i.goods_id">
					<!-- right-options左边滑动的配置项 -->
					<uni-swipe-action-item :right-options="options" @click="swipeHandleDeleteClick(i)">
						<Goods @radio-change="radioChange" @num-change="numChange" :numberBoxShow="true"
							:radioShow="true" :goods="i"></Goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<!-- 结算组件 -->
		<Settle></Settle>

	</view>
	<view v-else class="nullCart">
		<image src="../../static/a738fdc4047b250e489c9c39cac74efb_512_512.jpg" mode="widthFix"></image>
		<view>
			你的购物车没有商品哦
		</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from "pinia";
	import {
		reactive
	} from "vue";
	import {
		useCartStore
	} from "../../store/cart.js"
	import {
		setBadge
	} from "../../hooks/setBadge.js"
	
	//购物车上设置微标
	setBadge()

	// 左边滑动时显示
	let options = reactive([{
		text: "删除", //显示文本
		style: {
			backgroundColor: "#C00000",
		}
	}])

	//购物车仓库
	const cart = useCartStore()

	//购物车列表
	const {
		cartList
	} = storeToRefs(cart)

	const {
		//更新购物车商品的勾选状态
		updateCartState,
		//更新购物车商品的数量
		updateCartCount,
		//删除购物车商品
		deleteCart
	} = cart

	//选择商品时触发
	const radioChange = (item) => {
		//修改vuex
		updateCartState(item)
	}

	//购买的商品数量发生变化时触发
	const numChange = (item) => {
		//修改vuex
		updateCartCount(item)
	}

	const swipeHandleDeleteClick = (item) => {
		//修改vuex
		deleteCart(item.goods_id)

	}
</script>

<style lang="scss">
	.cart-cantainer {
		.cart-title {
			margin: 14rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;

			.cart-title-text {
				font-size: 36rpx;
				margin-left: 7px;
			}
		}

		.cart-list {
			margin: 14rpx;
			padding-bottom: 70px;
		}
	}

	.nullCart {
		height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 400rpx;
		}

		view {
			font-size: 48rpx;
			font-weight: bold;
		}

	}
</style>