<template>
	<view class="Settle">
		<view class="allRadio">
			<label class="radio">
				<radio @click="allCheck" :checked="isCheckAll" color="#C00000" /><text>全选</text>
			</label>
		</view>
		<view class="count">
			合计: <text style="color: #C00000;">￥{{checkGoodsPrice}}</text>
		</view>
		<view class="button" @click="settlement">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from "pinia";
	import {
		computed,
		ref
	} from "vue"
	import {
		useCartStore
	} from "@/store/cart.js"
	import {
		useUserStore
	} from "@/store/user.js"
	import {
		useAddress
	} from "../../hooks/address.js"

	const addAddress = useAddress()

	// 购物车仓库
	const cart = useCartStore()
	// 用户信息仓库
	const user = useUserStore()

	let seconds = ref(3) // 倒计时
	let timer = ref(null) // 定时器
	let {
		//勾选的商品总数
		checkCount,
		//购物车商品的总数
		total,
		//已勾选商品的价格
		checkGoodsPrice,
		//购物车已勾选商品
		checkGoods
	} = storeToRefs(cart)

	let {
		//用户Token
		token,
		//地址
		completeAddress
	} = storeToRefs(user)

	//是否已经全选
	let isCheckAll = computed(() => {
		return total.value, checkCount.value
	})

	const {
		//全选
		CheckAll,
	} = cart

	const {
		//保存跳转信息
		updateRedirectInfo
	} = user

	//全选
	const allCheck = () => {
		CheckAll(isCheckAll.value)
	}

	//支付
	const payOrder = () => {
		uni.$showMsg("支付成功")
	}

	// 展示跳转信息
	const showTip = (n) => {
		uni.showToast({
			icon: "none",
			title: "请登录后再结算，" + n + "秒后跳转登录页",
			mask: true,
			duration: 1000
		})
	}

	// 延时跳转
	const delayNavigate = () => {
		//重新赋值为3秒
		seconds.value = 3
		//展示信息
		showTip(seconds.value)
		//对秒数seconds进行--
		timer.value = setInterval(() => {
			seconds.value--
			// 小于或等于0时跳转
			if (seconds.value <= 0) {
				//清除定时器
				clearInterval(timer.value)
				//跳转
				uni.switchTab({
					url: "/pages/my/my",
					success: () => {
						updateRedirectInfo({
							openType: "switchTab",
							from: "/pages/cart/cart"
						})
					}
				})
			}
			//展示信息
			showTip(seconds.value)
		}, 1000)


	}

	//支付按钮
	const settlement = () => {
		//没有选择结算的商品时
		if (!checkCount.value) {
			return uni.$showMsg("请选择要结算的商品")
		}
		//没有登录时
		if (!token.value) {
			//延时跳转
			delayNavigate()
			return
		}
		//没有选择收货地址时
		if (!completeAddress.value) {
			uni.$showMsg("请选择收货地址")
			setTimeout(() => addAddress(), 500)
			return
		}
		payOrder()
	}
</script>

<style lang="scss">
	.Settle {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		height: 50px;
		background-color: #f5f5f5;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.allRadio {
			margin-left: 14rpx;
			height: 50px;
			line-height: 50px;
		}

		.count {
			height: 50px;
			line-height: 50px;
		}

		.button {
			width: 200rpx;
			height: 50px;
			background-color: #C00000;
			text-align: center;
			line-height: 50px;
		}
	}
</style>