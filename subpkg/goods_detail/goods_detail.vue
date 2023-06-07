<template>
	<view v-if="goods_info.goods_name">
		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick"
				@click="onClick" />
		</view>
		<!-- 轮播区 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="item.pics_id" @click="preview(index)">
				<image :src="item.pics_big_url"></image>
			</swiper-item>
		</swiper>
		<!-- 文本区 -->
		<view class="goods-info-cantainer">
			<view class="price">
				￥{{goods_info.goods_price | toFixed}}
			</view>
			<view class="name-sc">
				<view class="name">
					{{goods_info.goods_name}}
				</view>
				<view class="sc" @click="handlerSC">
					<view>
						<uni-icons v-if="!scstatus" type="star" size="30" color="gray"></uni-icons>
						<uni-icons v-else type="star-filled" size="30" color="gray"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
			</view>
			<view class="yf">
				快递，免运费
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="richText">
			<rich-text :nodes="goods_info.goods_introduce || ''"></rich-text>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed,
		watch
	} from "vue";
	import {
		storeToRefs
	} from 'pinia'
	import {
		useCartStore
	} from '../../store/cart.js'
	import {
		useSCStore
	} from '../../store/sc.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';

	// cart仓库
	const cart = useCartStore()

	// sc仓库
	const sc = useSCStore()

	//商品详情
	let goods_info = ref({})
	
	//收藏的状态
	let scstatus = ref()

	// 左侧按钮组的配置对象
	let options = reactive([{
		icon: 'shop',
		text: '店铺'
	}, {
		icon: 'cart',
		text: '购物车',
	}])

	// 右侧按钮组的配置对象
	let buttonGroup = reactive([{
			text: '加入购物车',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ffa200',
			color: '#fff'
		}
	])

	//购物车商品总数
	const {
		total
	} = storeToRefs(cart)
	
	//监听total
	watch(total, (newValue) => {
		options[1].info = newValue
	}, {
		immediate: true
	})

	// cart仓库的方法
	const {
		addToCart
	} = cart


	// sc仓库的方法
	const {
		addSC,
		isSC
	} = sc
	


	//获取商品详情
	const getGoodsDetail = async (goods_id) => {
		//发送请求
		const {
			data: res
		} = await uni.$API.getGoodsDetail({
			goods_id
		})
		//获取失败
		if (res.meta.status !== 200) uni.$showMsg()
		res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
			'<img style="display:block;"').replace(/webp /g, 'jpg')
		goods_info.value = res.message
	}

	//实现轮播图的预览效果
	const preview = (index) => {
		uni.previewImage({
			current: index,
			urls: goods_info.value.pics.map(i => i.pics_big_url)
		})
	}

	//点击购物车
	const onClick = (e) => {
		// 判断是否点击的按钮为购物车
		if (e.content.text == "购物车") {
			uni.switchTab({
				url: "/pages/cart/cart"
			})
		}
	}

	//加入购物车
	const buttonClick = (e) => {
		// 判断是否点击的按钮为加入购物车
		if (e.content.text == "加入购物车") {
			// 结构出需要的数据
			const {
				goods_id,
				goods_name,
				goods_price,
				goods_small_logo,
			} = goods_info.value
			//添加到购物车列表
			addToCart({
				goods_id,
				goods_name,
				goods_price,
				goods_small_logo,
				goods_count: 1,
				goods_state: true
			})
		}
	}
	
	//收藏
	const handlerSC = () => {
		// 结构出需要的数据
		const {
			goods_id,
			goods_name,
			goods_price,
			goods_small_logo,
		} = goods_info.value
		//添加到购物车列表
		addSC({
			goods_id,
			goods_name,
			goods_price,
			goods_small_logo,
			goods_count: 1,
			goods_state: true
		})
		//收藏的状态
		scstatus.value = isSC(goods_id)
	}

	onLoad((options) => {
		// 获取页面id
		const {
			goods_id
		} = options
		//获取商品详情
		getGoodsDetail(goods_id)
	})
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-cantainer {
		padding: 0 15px;

		.price {
			font-size: 48rpx;
			color: red;
			line-height: 70px;
		}

		.name-sc {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name {
				width: 80%;
				font-size: 30rpx;
			}

			.sc {
				padding-left: 25px;
				border-left: 1px solid gray;
				font-size: 30rpx;

				view {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

			}
		}

		.yf {
			line-height: 70px;
		}
	}

	.goods_nav {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
</style>