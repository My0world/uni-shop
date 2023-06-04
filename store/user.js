import {
	defineStore
} from "pinia"
// 本地存储
import {
	setStorageSync,
	getStorageSync,
	removeStorageSync
} from "../until/StorageSync.js"

export const useUserStore = defineStore("user", {
	state: () => ({
		address: getStorageSync("address") || {}, //用户和手机号码
		token: getStorageSync("token") || "", // 用户标识符
		userInfo: getStorageSync("userInfo") || {}, //用户基本信息
		redirectInfo: null //跳转到用户页之前的路径
	}),
	getters: {
		//完整地址
		completeAddress(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo,
			} = state.address
			return provinceName + cityName + countyName + detailInfo
		}
	},
	actions: {
		//更新和添加地址
		updateAddress(value) {
			this.address = value
			//本地存储
			setStorageSync("address", value)
		},
		//更新和添加用户信息
		unpdateUserInfo(value) {
			this.userInfo = value
			//本地存储
			setStorageSync("userInfo", value)
		},
		//更新和添加token
		updataToken(value) {
			this.token = value
			//本地存储
			setStorageSync("token", value)
		},
		// 退出登录
		clearUserInfo() {
			this.address = {}
			this.token = ""
			this.userInfo = {}
			removeStorageSync("address")
			removeStorageSync("token")
			removeStorageSync("userInfo")
		},
		// 保存跳转到用户页之前的路径
		updateRedirectInfo(value) {
			this.redirectInfo = value
		}
	}
})