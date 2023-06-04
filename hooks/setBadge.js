import {
	useCartStore
} from "@/store/cart.js"
import {
	storeToRefs
} from "pinia"
import {
	onLoad,
	onShow,
	onUnload,
	onHide
} from "@dcloudio/uni-app"
import {
	watch
} from "vue"
export function setBadge() {
	//购物车仓库
	const cart = useCartStore()

	const {
		//购物车商品的数量
		total
	} = storeToRefs(cart)

	// 监听total的变化
	watch(total, (newValue) => {
		//设置tabbar的微标
		uni.setTabBarBadge({
			index: 2, //tabbar的索引值
			text: newValue + "" // 必须是字符串
		})
	}, {
		immediate: true
	})

	//设置tabbar的微标
	function setBadge() {
		//设置tabbar的微标
		uni.setTabBarBadge({
			index: 2, //tabbar的索引值
			text: total.value + "" // 必须是字符串
		})
	}

	//去除tabbar的微标
	function removeBadge() {
		//去除tabbar的微标
		uni.removeTabBarBadge({
			index: 2, //tabbar的索引值
		})
	}

	onLoad(() => {
		setBadge()
	})

	onShow(() => {
		setBadge()
	})
}