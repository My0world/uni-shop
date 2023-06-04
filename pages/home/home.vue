<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<Search bgColor="#00827f" :borderRadius="30" @click="gotoSearch"></Search>
		</view>
		<!-- 轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="nav">
			<navigator v-for="(item,index) in navList" open-type="switchTab" class="navItem" @click="navClickHandler(item)" :key="index">
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 楼层 -->
		<!-- 楼层容器 -->
		<view class="floor">
			<!-- 每一个item -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题 -->
				<view class="floor-itemTitle">
					<image :src="item.floor_title.image_src"></image>
				</view>

				<!-- 图片容器 -->
				<view class="floor-itemImg-box">
					<!-- 左侧图片 -->
					<navigator class="left-box" :url="item.product_list[0].navigator_url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix">
						</image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-box">
						<navigator class="right-box-item" v-for="(item2,index) in item.product_list" :key="index"
							:url="item2.navigator_url">
							<image v-if="index === 0 ? false :true" :src="item2.image_src"
								:style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from "vue";
	
	import {
		setBadge
	} from "../../hooks/setBadge.js"
	
	//购物车上设置微标
	setBadge()

	let swiperList = ref([]) //轮播图数据
	let navList = ref([]) //分类导航区域数据
	let floorList = ref([]) //楼层数据


	//获取轮播图数据
	const getSwiperList = async () => {
		let {
			data: res
		} = await uni.$API.getSwiperList()
		//请求失败
		if (res.meta.status != 200) {
			return uni.$showMsg()
		}
		swiperList.value = res.message
	}

	//获取分类导航区域数据
	const getNavList = async () => {
		let {
			data: res
		} = await uni.$API.getNavList()
		//请求失败
		if (res.meta.status != 200) {
			return uni.$showMsg()
		}
		navList.value = res.message
	}

	//获取楼层数据
	const getFloorList = async () => {
		let {
			data: res
		} = await uni.$API.getFloorList()
		//请求失败
		if (res.meta.status != 200) {
			return uni.$showMsg()
		}
		//对返回的数据的navigator_url进行处理
		res.message.forEach((item) => {
			item.product_list.map((i) => {
				i.navigator_url = "/subpkg/goods_list/goods_list?" + i.navigator_url.split(
					"?")[1]
			})
		})
		floorList.value = res.message
	}

	//点击分类图标
	const navClickHandler = (item) => {
		if (item.name === "分类") {
			uni.switchTab({
				url: "/pages/cate/cate"
			})
		}
	}

	//点击搜索框
	const gotoSearch = () => {
		uni.navigateTo({
			url: "/subpkg/search/search"
		})
	}

	onLoad(() => {
		//获取轮播图数据
		getSwiperList()
		//获取分类导航区域数据
		getNavList()
		// 获取楼层数据
		getFloorList()

	})
</script>


<style lang="scss">
	.search {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav {
		margin-top: 10px;
		padding: 0px 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.navItem {
			width: 120rpx;
			height: 120rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.floor {
		.floor-item {
			margin-top: 10px;
			padding: 0px 10rpx;

			.floor-itemTitle {
				image {
					width: 100%;
					height: 60rpx;
				}
			}

			.floor-itemImg-box {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.right-box {
					display: flex;
					justify-content: space-around;
					align-items: center;
					flex-wrap: wrap;

				}
			}
		}
	}
</style>