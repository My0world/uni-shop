import {
	useUserStore
} from "@/store/user.js"
export function useAddress() {
	
	//用户信息仓库
	const user = useUserStore()
	
	const {
		//更新地址
		updateAddress
	} = user
	
	// 添加地址
	async function addAddress() {
		const res = await uni.chooseAddress().catch(err => err)
		if (res.errMsg === "chooseAddress:ok") {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo,
				telNumber,
				userName
			} = res
			//提交给vuex
			updateAddress({
				provinceName,
				cityName,
				countyName,
				detailInfo,
				telNumber,
				userName
			})
		}
		//授权失败或用户没有授权
		if (res && (res.errMsg === 'chooseAddress:fail auth deny' || res.errMsg ===
				'chooseAddress:fail authorize no response')) {
			reAuth()
		}
	}

	// 调用此方法，重新发起收货地址的授权
	async function reAuth() {
		// 提示用户对地址进行授权
		const [err2, confirmResult] = await uni.showModal({
			content: '检测到您没打开地址权限，是否去设置打开？',
			confirmText: "确认",
			cancelText: "取消",
		})
		// 如果弹框异常，则直接退出
		if (err2) return
		// 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
		if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
		// 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
		if (confirmResult.confirm) return uni.openSetting({
			// 授权结束，需要对授权的结果做进一步判断
			success: (settingResult) => {
				// 地址授权的值等于 true，提示用户 “授权成功”
				if (settingResult.authSetting['scope.address']) return uni.$showMsg(
					'授权成功！请选择地址')
				// 地址授权的值等于 false，提示用户 “您取消了地址授权”
				if (!settingResult.authSetting['scope.address']) return uni.$showMsg(
					'您取消了地址授权！')
			}
		})
	}
	return addAddress
}