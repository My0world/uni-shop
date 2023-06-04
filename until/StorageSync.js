//设置
export const setStorageSync = (name, value) => {
	uni.setStorageSync(name, JSON.stringify(value))
}
//获取
export const getStorageSync = (name) => {


	if (uni.getStorageSync(name) === "") {
		return null
	} else {
		return JSON.parse(uni.getStorageSync(name))
	}
}
//移除
export const removeStorageSync = (name) => {
	return uni.removeStorageSync(name)
}
//清除
export const clearStorageSync = () => {
	return uni.clearStorageSync()
}