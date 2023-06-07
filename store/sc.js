import {
	defineStore
} from "pinia"
// 本地存储
import {
	setStorageSync,
	getStorageSync
} from "../until/StorageSync.js"
export const useSCStore = defineStore("sc", {
	state: () => ({
		//收藏列表
		scList: getStorageSync("scList") || [],
	}),
	getters: {
		total(){
			return this.scList.length
		}
	},
	actions: {
		// 添加收藏
		addSC(value) {
			// 搜索列表
			let index = this.scList.findIndex((i) => i.goods_id === value.goods_id)
			if(index !== -1) return uni.$showMsg("你已收藏这个商品了")
			//添加到收藏列表
			this.scList.push(value)
			//更新本地
			setStorageSync("scList", this.scList)
		},
		// 删除收藏
		deleteSC(value) {
			// 搜索列表
			let index = this.scList.findIndex((i) => i.goods_id === value)
			// 删除列表
			this.scList.splice(index, 1)
			// 更新本地
			setStorageSync("scList", this.scList)
		},
		//是否收藏
		isSC(value){
			// 搜索列表
			let index = this.scList.findIndex((i) => i.goods_id === value)
			return index === -1 ? false : true
		}
	}
})