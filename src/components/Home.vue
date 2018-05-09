<style scoped>
	/*.mint-swipe{*/
		/*width: 100%;*/
		/*height: 400px;*/

	/*}*/
	/*.mint-swipe-item{*/
		/*width: 100%;*/
		/*height:400px;*/
	/*}*/
	/*.mint-swipe-item img {*/
		/*width: 100%;*/
	/*}*/
	.mui-grid-view.mui-grid-9 {
		background-color:#fff;
		border-top: 0;
		border-left: 0;

	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right: 0;
		border-bottom: 0;
	}
	.mui-icon-home:before,.mui-icon-email:before,
	.mui-icon-chatbubble:before,.mui-icon-phone:before,
	.mui-icon-phone:before,.mui-icon-location:before,
	.mui-icon-search:before{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}
	.mui-icon-home:before{
		background-image:url(../../statics/imgs/1.png);
	}
	.mui-icon-email:before{
		background-image:url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background-image:url(../../statics/imgs/3.png);
	}
	.mui-icon-phone:before{
		background-image:url(../../statics/imgs/4.png);
	}
	.mui-icon-location:before{
		background-image:url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background-image:url(../../statics/imgs/3.png);
	}


</style>
<template>
	<div id="mgtb">
	<!-- 首页轮播图 -->
		<!--<mt-swipe :auto="2000">-->
  			<!--<mt-swipe-item  v-for="item of lunbo">-->
				<!--<img :src="item.img">-->
  			<!--</mt-swipe-item>-->
		<!--</mt-swipe>-->
        <slider :imgs="lunbo"></slider>
	<!-- 九宫格 -->
		<div class="mui-content">
			        <ul class="mui-table-view mui-grid-view mui-grid-9">
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news/newslist">
			                    <span class="mui-icon mui-icon-home"></span>
			                    <div class="mui-media-body">新闻咨询</div></router-link></li>
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photo/photolist">
			                    <span class="mui-icon mui-icon-email"></span>
			                    <div class="mui-media-body">图片分享</div></router-link></li>
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods/goodslist">
			                    <span class="mui-icon mui-icon-chatbubble"></span>
			                    <div class="mui-media-body">商品购买</div></router-link></li>
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/say/goodslist">
			                    <span class="mui-icon mui-icon-phone"></span>
			                    <div class="mui-media-body">留言反馈</div></router-link></li>
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/audios/avis">
			                    <span class="mui-icon mui-icon-location"></span>
			                    <div class="mui-media-body">视频专区</div></router-link></li>
			            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/callme">
			                    <span class="mui-icon mui-icon-search"></span>
			                    <div class="mui-media-body">联系我们</div></router-link></li>
		        	</ul> 
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import common from '../kits/common.js';
	import slider from './subcom/slider.vue';
	export default{
	    components:{
	      slider
        },
		data(){
			return {
				lunbo:[
				/*{
					"url": "http://www.tcshop.com/",
					"img": "http://www.tcshop.com/attachment/2016/10/11/62261476186912.png"
				},
				{
					"url": "http://www.tcshop.com/",
					"img": "http://www.tcshop.com/attachment/2016/10/11/1281476191108.png"
				},
				{
					"url": "http://www.tcshop.com/",
					"img": "http://www.tcshop.com/attachment/2016/10/11/93131476193343.png"
				},
				{
					"url": "http://www.tcshop.com/",
					"img": "http://www.tcshop.com/attachment/2016/10/12/51351476266063.png"
				}*/
				]
			}
		},
		created(){
			this.getHomeLunbo()
		},
		methods:{
			getHomeLunbo(){
				var url=common.apidomain;
				this.$http.get(url).then(function(response){
					var data=response.body;
					console.log(data);
					if(data.status!=0){
						Toast({
							message: data.message,
						});
						return ;
					}
					this.lunbo=data.message;
				})
				// var data = fetch("../data/data.json").then(res => res.json())
				// if(data.status!=0){
				// 	Toast({
				// 		message: data.message,
				// 	});
				// 	return ;
				// }
				// this.lunbo=data.message;

			}

		}
	}
</script>