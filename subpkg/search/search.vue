<template>
	<view>
		<!-- 输入框 -->
		<uni-search-bar :value="kw" :radius="100" @input="input" cancelButton="none"
			@clear="handlerClear"></uni-search-bar>
		<!-- 结果列表 -->
		<view class="sugg-list" v-if="searchRes.length !== 0">
			<view style="text-align: center; line-height: 30px;" v-if="searchRes[0].text">
				{{searchRes[0].text}}
			</view>
			<view v-else class="sugg-item" v-for="i in searchRes" :key="i.goods_id" @click="gotoDetail(i.goods_id)">
				<text>{{i.goods_name}}</text>
				<uni-icons type="search" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="17" @click="clearHistoryList"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag style="margin: 7px 5px;" v-for="(i,index) in histories" :text="i" :key="index"
					@click="handleTagClick(i)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		debounce
	} from "lodash";
	import {
		setStorageSync,
		getStorageSync,
		removeStorageSync
	} from "../../until/StorageSync.js"
	import {
		computed,
		reactive,
		ref
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app"

	let kw = ref("") //搜索关键字
	let searchRes = ref([]) //搜索结果
	let historyList = ref([]) //搜索历史
	
	const histories = computed(() => {
		if(!historyList.value){
			return historyList.value
		}else{
			return [...historyList.value].reverse()
		}
	})

	//输入
	const input = debounce(function(e) {
		getSearchRes(e)
		if (e === "") {
			//搜索框为空时搜索结果清空
			handlerClear()
		}
	}, 500)

	//获取搜索结果
	const getSearchRes = async (e) => {
		if (e.trim() === "") {
			return
		}
		let {
			data: res
		} = await uni.$API.getSearchRes({
			query: e.trim()
		})
		if (res.meta.status !== 200) return uni.$showMsg()
		saveSearchHistory(e.trim())
		searchRes.value = res.message
		console.log(searchRes.value)
		//搜索出没有数据时给搜索结果数组添加提示文本
		if (searchRes.value.length === 0) {
			searchRes.value.push({
				text: "没有你需要的数据哦"
			})
		}
	}

	//清除输入框
	const handlerClear = async () => {
		searchRes.value = []
	}

	//保存搜索关键字的方法
	const saveSearchHistory = (k) => {
		// 把数组对象转为set
		const set = new Set(historyList.value)
		// 调用Set的delete方法删除元素，保证新搜索的关键字和重复的关键字在前面
		set.delete()
		// 调用Set的add方法添加元素
		set.add(k)
		// 转为array对象
		historyList.value = Array.from(set)
		//持久化存储
		setStorageSync("historyList", historyList.value)
	}

	//跳转到详情页
	const gotoDetail = (i) => {
		uni.navigateTo({
			url: "/subpkg/goods_detail/goods_detail?goods_id=" + i
		})
	}

	//清空历史记录
	const clearHistoryList = () => {
		historyList.value = []
		//清除本地
		removeStorageSync("historyList")
	}


	//点击历史搜索关键字进行搜索
	const handleTagClick = (i) => {
		kw.value = i
		uni.navigateTo({
			url: "/subpkg/goods_list/goods_list?query=" + i
		})
	}
	
	onLoad(()=>{
		if (getStorageSync("historyList") !== null) {
			historyList.value = getStorageSync("historyList")
		} else {
			historyList.value = ["华为", "苹果", "显示器"]
		}
	})
</script>

<style lang="scss">
	.sugg-item {
		font-size: 15px;
		padding: 13px 5px;
		border-bottom: 2px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;

		text {
			// 文字不可换行
			white-space: nowrap;
			//超过的部分隐藏
			overflow: hidden;
			//文本溢出后使用...代替
			text-overflow: ellipsis;
			margin-right: 5px;

		}
	}

	.history-box {
		.history-title {
			font-size: 15px;
			padding: 13px 5px;
			border-bottom: 2px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			padding-top: 7px;
		}

	}
</style>