<template>
	<view>
		<Login v-if="!token"></Login>
		<UserInfo v-else></UserInfo>
	</view>
</template>

<script setup>
	import {
		useUserStore
	} from "@/store/user.js"
	import {
		storeToRefs
	} from "pinia"
	import {
		setBadge
	} from "../../hooks/setBadge.js"
	
	//购物车上设置微标
	setBadge()

	//用户仓库
	const user = useUserStore()

	let {
		//token
		token
	} = storeToRefs(user)
</script>

<style>

</style>