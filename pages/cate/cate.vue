<template>
	<view class="">
		<!-- 搜索框 -->
		<view style="border: 1px solid #00827f;">
			<Search bgColor="#00827f" :borderRadius="30" @click="gotoSearch"></Search>
		</view>

		<!-- 滚动区 -->
		<view class="scroll-container" :style="{height:windowHeight+'px'}">
			<!-- 左侧的滚动区 -->
			<scroll-view class="leftScroll" scroll-y="true">
				<view v-for="(item,index) in cateLevel1List" class="lefrScorll-item" :class="{active:active === index}"
					:key="item.cat_id" @click="handleChange(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧的滚动区 -->
			<scroll-view class="rightScroll" scroll-y="true" :scroll-top="scrollTop">
				<view class="right-lv2" v-for="item in cateLevel2List" :key="item.cat_id">
					<view class="right-lv2-title">
						{{item.cat_name}}
					</view>
					<view class="right-lv2-container">
						<view class="lv2-item" v-for="i2 in item.children" :key="i2.cat_id" @click="gotoGoodsList(i2)">
							<image :src="i2.cat_icon.replace('dev','web')" mode="widthFix" />
							<text>{{i2.cat_name}}</text>
						</view>
					</view>

				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	import {
		onLoad
	} from '@dcloudio/uni-app'
	
	import {
		setBadge
	} from "../../hooks/setBadge.js"
	
	//购物车上设置微标
	setBadge()

	let windowHeight = ref(0) //设备可使用的高度
	let cateLevel1List = ref([]) //一级分类列表的数据
	let cateLevel2List = ref([]) //二级分类列表的数据
	let active = ref(0) //点击切换样式
	let scrollTop = ref(0) //滚动条高度

	//获取设备可使用的高度
	const getWindowHeight = async () => {
		const sysInfo = uni.getSystemInfoSync()
		windowHeight.value = sysInfo.windowHeight - 50 //减去搜索框高度
	}

	//获取分类列表的数据
	const getcateList = async () => {
		let {
			data: res
		} = await uni.$API.getcateList()
		//请求失败
		if (res.meta.status != 200) {
			return uni.$showMsg()
		}
		//一级分类列表的数据
		cateLevel1List.value = res.message
		//二级分类列表的数据
		cateLevel2List.value = res.message[0].children
	}

	//切换一级导航处理
	const handleChange = (index) => {
		//为点击的一项添加.active样式
		active.value = index
		//重新给cateLevel2List赋值
		cateLevel2List.value = cateLevel1List.value[index].children
		//滚动条重新回到上边
		scrollTop.value = Math.random()
	}

	//跳转到商品列表页
	const gotoGoodsList = (item) => {
		uni.navigateTo({
			url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
		})
	}

	//跳转到searh页
	const gotoSearch = (item) => {
		uni.navigateTo({
			url: "/subpkg/search/search"
		})
	}



	onLoad(() => {
		//获取设备可使用的高度
		getWindowHeight()
		//获取分类列表的数据
		getcateList()

	})
</script>

<style lang="scss">
	.scroll-container {
		height: 200px;
		display: flex;

		.leftScroll {
			width: 100px;
			height: 100%;

			.lefrScorll-item {
				font-size: 12px;
				line-height: 50px;
				background-color: #eeeeee;
				text-align: center;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: " ";
						display: block;
						width: 3px;
						height: 35px;
						background-color: red;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}

		}

		.rightScroll {
			height: 100%;
			background-color: #ffffff;

			.right-lv2 {
				padding-bottom: 20px;

				.right-lv2-title {
					font-size: 24rpx;
					font-weight: bold;
					text-align: center;
					line-height: 40px;
				}

				.right-lv2-container {
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.lv2-item {
						width: 33.33%;
						height: 80px;
						margin-top: 10px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						image {
							width: 60px;
							height: 60px;
						}

						text {
							font-size: 30rpx;
							line-height: 20px;
						}
					}
				}
			}


		}
	}
</style>