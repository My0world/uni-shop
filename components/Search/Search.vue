<template>
	<view class="search-container" :style="{backgroundColor:bgColor}">
		<view class="search-box" @click="handlerSearch" :style="{borderRadius:borderRadius+'px'}">
			<uni-icons class="icon" type="search" size="17"></uni-icons>
			<text class="search-text">搜索</text>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from "vue"
	
	//父组件给子组件的数据
	defineProps({
		//背景颜色
		bgColor: {
			type: String,
			default: "#00827f" 
		},
		//圆角
		borderRadius: {
			type: Number,
			default: 50 //
		}
	})
	
	//调用父组件的事件
	const emit = defineEmits(['click']);
	
	// 点击搜索框
	const handlerSearch = () => {
		emit("click")
	}
</script>

<style lang="scss">
	.search-container {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;


		.search-box {
			width: 85%;
			height: 35px;
			background-color: white;
			text-align: center;
			line-height: 35px;

			.search-text {
				margin-left: 10px;
				font-size: 17px;
			}
		}
	}
</style>