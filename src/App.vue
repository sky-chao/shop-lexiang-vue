<!-- 以后项目的根组件 -->
<style scoped>
	#back{
		width: 60px;
		position:fixed;
		top:10px;
		left:15px;
		z-index: 101;
	}
	.backto{
		color:#fff;
		font-weight: bold;
		font-size: 14px;
	}
</style>
<template>
	<div>
		<mt-header fixed title="好趣味-商城系统"></mt-header>
		<div id="back" v-if="isshow">
			<a href="javascript:void(0)" class="backto" @click="gotoup">返回</a>
		</div>
		<router-view></router-view>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" mui-active to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label" >首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar/car">
				<span class="mui-icon mui-icon-contact"><span id="numbercount" class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import {vms,NUMBERCOUNT} from './kits/vm.js';
    vms.$on(NUMBERCOUNT,function(count){
		var carnum=document.querySelector('#numbercount');
        carnum.innerText=parseInt(carnum.innerText)+count;
    })
	export default{  // es6的导出对象的写法
		data(){  //等价于 es5的 data:function(){
			return {
                'isshow':false
			}
		},
		watch:{
		    $route:function(newRoute,oldRoute){
		        if(newRoute.path.toLowerCase()=="/home"){
		            this.isshow=false;
				}else{
		            this.isshow=true;
				}
			}
		},
		methods:{
            gotoup(){
               this.$router.go(-1);
			}
		},
		created(){

		}
	}
</script>

