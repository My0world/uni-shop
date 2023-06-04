// 导入网络请求的包
import {
	$http
} from "@escook/request-miniprogram"

//配置请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中"
	})
	//请求my有关的API接口时需要token
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorizaton: store.state.user.token
		}
	}
}

//配置响应拦截器
$http.beforeRequest = function(options) {
	uni.hideLoading()
}

export default function(options) {
	const {
		mock,
		method,
		url,
		query
	} = options
	//判断是否开启mock
	let isMock = mock || false
	if (mock) {
		$http.baseUrl = "https://www.fastmock.site/mock/baa135380b74adb56d1e8b26975ff8c5"
	} else {
		$http.baseUrl = "https://api-hmugo-web.itheima.net"
	}
	//请求方式
	let m = method || "get"
	switch (m) {
		case "get":
			return get(url, query);
		case "post":
			return post(url, query);
		case "put":
			return put(url, query);
		case "delete":
			return del(url, query);
	}
}

//get请求方式
function get(url, query = {}) {
	return $http.get(url, query)
}
//post请求方式
function post(url, query = {}) {
	return $http.post(url, query)
}
//put请求方式
function put(url, query = {}) {
	return $http.put(url, query)
}
//delete请求方式
function del(url, query = {}) {
	return $http.delete(url, query)
}