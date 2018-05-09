<style scoped>
	img.mui-pull-left{
		width: 80px;
		height: 80px;
		line-height:80px;
		max-width: 80px;
	}
	.time {
		margin-top:15px;
		color:#007aff;
		font-size: 14px;
	}
	.dj{
		margin-left:30px;
	}
</style>
<template>
	<div id="mgtb">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in message">
				<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis' v-text="item.zhaiyao"></p>
						<div class="time">
							<span>发表时间:{{item.add_time}}</span>
							<span class="dj">点击数{{item.click}}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
export default{
	data(){
		return {
            "message": [
            ]
		}
	},
	created(){
        this.getnewlists();
	},
	methods:{
        getnewlists(){
	        //var url=common.apidomain+"/index.php/Home/Index/newslist";
            var url = 'http://www.tcshop.com/index.php/Home/News/getnewslist';
	        this.$http.get(url).then(function(response){
	            var data=response.body;
	            if(data.status!=0){
	                alert(data.message);
	                return;
				};
	            this.message=data.message;
			})
		}
	}

}
</script>