<template>
	<view class="goodsList-cantainer">
		<view v-for="i in goodsList" :key="i.goods_id" @click="gotoDetail(i.goods_id)">
			<Goods :goods="i"></Goods>
		</view>

		<view v-if="showText" style="text-align: center; margin-top:20px; padding-bottom: 20px;">没有更多了哦</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";

	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app"


	let goodsList = ref([]) //商品列表
	let total = ref(0) //商品总数
	//请求对象
	let queryObj = reactive({
		//查询关键字
		query: "",
		//商品分类id
		cid: "",
		//当前页码
		pagenum: 1,
		//每页显示的数据
		pagesize: 10
	})
	let showText = ref(false) //告诉用户没有更多了哦

	//获取商品列表
	let getGoodsList = async (cb) => {
		//发送请求
		let {
			data: res
		} = await uni.$API.getGoodsList(queryObj)
		cb && cb()
		//获取失败
		if (res.meta.status !== 200) {
			return uni.$showMsg()
		}
		total.value = res.message.total
		goodsList.value = [...goodsList.value, ...res.message.goods]
	}

	//跳转到详情页
	let gotoDetail = (id) => {
		uni.navigateTo({
			url: "/subpkg/goods_detail/goods_detail?goods_id=" + id
		})
	}

	onLoad((options) => {
		// 获取页面参数
		queryObj.query = options.query || ""
		queryObj.cid = options.cid || ""
		//获取商品列表
		getGoodsList()
	})

	onReachBottom(() => {
		//当返回的数据已经没有了就不在发送请求获取数据
		if (goodsList.value.length >= total.value) return showText.value = true
		queryObj.pagenum += 1
		//重新发送数据
		getGoodsList()
	})

	onPullDownRefresh(() => {
		//重置数据
		goodsList.value = []
		total.value  = 0
		showText.value  = false
		queryObj.pagenum = 1
		//重新发送数据
		getGoodsList(() => {
			uni.stopPullDownRefresh()
		})
	})
</script>

<style lang="scss">
	.goodsList-cantainer {
		padding: 0px 7px;

	}
</style>