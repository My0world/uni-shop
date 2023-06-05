import request from "./request.js"
export default {
	//获取轮播图数据
	getSwiperList: () => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/home/swiperdata",
	}),
	//获取分类导航区域数据
	getNavList: () => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/home/catitems",
	}),
	//获取楼层数据
	getFloorList: () => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/home/floordata",
	}),
	//获取分类列表的数据
	getcateList: () => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/categories",
	}),
	//获取搜索关键字结果
	getSearchRes: (query) => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/goods/qsearch",
		query: query
	}),
	//获取搜索结果
	getGoodsList: (query) => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/goods/search",
		query: query
	}),
	//获取商品详情
	getGoodsDetail: (query) => request({
		mock: false,
		method: "get",
		url: "/api/public/v1/goods/detail",
		query: query
	}),
	//获取token
	getToken: (query) => request({
		mock: false,
		method: "post",
		url: "/api/public/v1/users/wxlogin",
		query: query
	})
}