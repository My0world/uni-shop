<template>
	<!-- 收藏列表 -->
	<view class="cart-list">
		<uni-swipe-action>
			<block v-for="i in scList" :key="i.goods_id">
				<!-- right-options左边滑动的配置项 -->
				<uni-swipe-action-item :right-options="options" @click="swipeHandleDeleteClick(i)">
					<Goods :goods="i"></Goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<view style="text-align: center;" v-if="scList.length === 0">
			你未有收藏的商品
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
		useSCStore
	} from "../../store/SC.js"

	// 购物车仓库
	const sc = useSCStore()

	const {
		// 删除收藏
		deleteSC
	} = sc

	//购物车列表
	const {
		scList
	} = storeToRefs(sc)

	// 左边滑动时显示
	let options = reactive([{
		text: "删除", //显示文本
		style: {
			backgroundColor: "#C00000",
		}
	}])

	//删除
	const swipeHandleDeleteClick = (item) => {
		//修改
		deleteSC(item.goods_id)
	}
</script>

<style>
	.cart-list {
		margin: 14rpx;
		padding-bottom: 70px;
	}
</style>