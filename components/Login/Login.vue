<template>
	<view class="login-cantainer">
		<uni-icons type="contact-filled" size="170" color="gray"></uni-icons>
		<button class="button" open-type="getUserInfo" @getuserinfo="getUserInfo">
			一键登录
		</button>

		<view class="text">
			登录后尽享更多权益
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

	// 用户仓库
	const user = useUserStore()

	let {
		//跳转到用户页之前的路径
		redirectInfo
	} = storeToRefs(user)

	const {
		//更新和添加用户信息
		unpdateUserInfo,
		//保存跳转到用户信息页的路径
		updateRedirectInfo,
		//更新和添加token
		updataToken
	} = user

	// 用户授权
	const getUserInfo = (e) => {
		//取消授权
		if (e.detail.errMsg === "getUserInfo:fail auth deny") return uni.$showMsg("你取消了授权")
		//保存到vuex中
		unpdateUserInfo(e.detail.userInfo)
		//获取token
		getToken(e.detail)
		// 重新跳转
		navgatorBack()
	}

	// 重新跳转会购物车页
	const navgatorBack = () => {
		//判断是否是结算时跳转过来的,如果是重新跳转会购物车页
		if (redirectInfo && redirectInfo.openType === "switchTab") {
			//跳转
			uni.switchTab({
				url: redirectInfo.from,
				complete: () => {
					//跳转后清除redirectInfo
					updateRedirectInfo(null)
				}
			})
		}
	}

	//获取token
	const getToken = async (info) => {
		//调用微信登录接口
		const userCode = await uni.login().catch(err => err)
		//判断是否登录成功
		if (userCode.errMsg !== "login:ok") return uni.$showMsg("登录失败")
		//整理出想要的数据
		const query = {
			code: userCode.code,
			encryptedData: info.encryptedData,
			iv: info.iv,
			rawData: JSON.parse(info.rawData),
			signature: info.signature
		}
		
		//向服务器获取token
		const {
			data: loginRes
		} = await uni.$API.getToken(query)
		if (loginRes.meta.status !== 200) {
			// 接口不行了

			// 接口可用时告诉用户登录失败
			// return uni.$showMsg("登录失败")

			// 用code当作token先
			uni.$showMsg("登录失败使用游客身份")
			return updataToken(userCode.code)
		}
		uni.$showMsg("登录成功")
		updataToken(loginRes.message.token)
	}
</script>

<style lang="scss">
	.login-cantainer {
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.button {
			width: 600rpx;
			height: 50px;
			margin: 25px 0 15px 0;
			font-size: 35rpx;
			text-align: center;
			line-height: 50px;
			color: white;
			border-radius: 100rpx;
			background-color: #C00000;
		}

		.text {
			font-size: 24rpx;
			color: gray;
		}

	}
</style>