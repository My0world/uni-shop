import {
	defineStore
} from "pinia"

// 本地存储
import {
	setStorageSync,
	getStorageSync
} from "../until/StorageSync.js"

import toFixed from "../until/toFixed"

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartList: getStorageSync("cartList") || [] // 购物车列表
	}),
	getters: {
		//已勾选的商品
		checkGoods(state) {
			return state.cartList.filter(x => x.goods_state)
		},
		//购物车商品的总数
		total(state) {
			let sum = 0
			state.cartList.forEach(i => {
				sum += i.goods_count
			})
			return sum
		},
		//勾选的商品总数
		checkCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cartList.filter(x => x.goods_state).reduce((total, item) => total += item
				.goods_count, 0)
		},
		//已勾选商品的价格
		checkGoodsPrice(state) {
			return toFixed(state.cartList.filter(x => x.goods_state).reduce((total, item) => total += item
				.goods_count * item.goods_price, 0))
		}
	},
	actions: {
		//删除购物车商品
		deleteCart(value) {
			const i = this.cartList.findIndex((i) => i.goods_id === value)
			this.cartList.splice(i, 1)
			setStorageSync("cartList", this.cartList)
		},

		//更新购物车商品的勾选状态
		updateCartState(value) {
			const i = this.cartList.findIndex((i) => i.goods_id === value.goods_id)
			this.cartList[i].goods_state = value.goods_state
			setStorageSync("cartList", this.cartList)
		},
		//更新购物车商品的数量
		updateCartCount(value) {
			const i = this.cartList.findIndex((i) => i.goods_id === value.goods_id)
			this.cartList[i].goods_count = value.goods_count
			setStorageSync("cartList", this.cartList)
		},
		//添加商品到购物车
		addToCart(value) {
			// 查找方法find会数组（浅拷贝一份）
			// 查找是否已经有这个购物车列表的商品
			const i = this.cartList.findIndex((i) => i.goods_id === value.goods_id)
			// 如果没有会返回-1
			if (i === -1) {
				this.cartList.push(value)
			} else {
				// 有就购物车列表的商品数量加一
				this.cartList[i].goods_count += 1
			}
			setStorageSync("cartList", this.cartList)
		},
		//全选
		CheckAll(value) {
			this.cartList.forEach(i => {
				i.goods_state = !value
			})
			setStorageSync("cartList", this.cartList)
		}
	},
})