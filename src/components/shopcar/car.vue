<style scoped>
	.shopbox{
		border-bottom:1px solid #ccc;
		display: flex;
		margin:5px;
	}
	.shopbox h5{
		color:#007aff;
	}
	.kaiguan{
		flex:0 0 65px;
	}
	.shopbox img {
		flex:0 0 75px;
		width: 75px;
		height: 75px;
		padding:5px;
	}
	.shopbox .right {
		padding:5px;
	}
	.shopbox ul {
		flex:1;
		padding-left:0;
		margin:10px 0;
	}
	.shopbox ul li {
		display:inline-block;
		list-style: none;
	}
	.shopbox ul li:first-child{
		color:red;
		margin-right: 10px;
	}
	.shopbox ul li:last-child{
		color:#007aff;
	}
	#total{
		background-color:#eee;
		display: flex;
	}
	#total #des{
		flex:1;
		font-size: 14px;
	}
	#total .bunt{
		flex:0 0 80px;
		margin-right: 30px;
		margin-top: 20px;
	}
	#total ul {
		padding-left:0px;
		padding:10px;
	}
</style>
<template>
	<div id="mgtb">
		<div  class="shopbox" v-for="(item,index) in shoplist">
			<mt-switch v-model="value[index]" class="kaiguan"></mt-switch>
			<img :src="item.thumb_path" >
			<div class="right">
				<h5 v-text="item.title"></h5>
				<ul>
					<li>￥{{item.sell_price}}</li>
					<li><carInputCount :initCount="item.cou" :goodsid="item.id"  @messageobj="getCarCount"></carInputCount></li>
					<li @click="del(item.id,index)">删除</li>
				</ul>
			</div>
		</div>
		<div id="total">
			<div id="des">
				<ul>
					<li>总计（不含用费）</li>
					<li>已勾选商品{{buyNumber}}件,总价:￥{{amountMoney}}元</li>
				</ul>
			</div>
			<div class="bunt">
				<mt-button type="danger" size="large">结算</mt-button>
			</div>
		</div>
		{{value}}
	</div>
</template>
<script>
	import carInputCount from "../subcom/carInputCount.vue";
	import {getCarinfo,setCarinfo,remov} from "../../kits/locasg.js";
    import { Toast } from 'mint-ui';
	export default{
	    components:{
            carInputCount
        },
            data(){
			return {
			    value:[],
				shoplist:[
                    // {
					 //    "cou":1,
					 //    "id":87,
						// "title":"荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 魅焰红",
						// "sell_price":1299,
						// "thumb_path":"../../../statics/imgs/sj6.jpg"
                    // },
                    // {
                    //     "cou":1,
                    //     "id":88,
                    //     "title":"Apple iPhone 7 Plus (A1661) 32G 玫瑰金色 移动联通电信4G手机",
                    //     "sell_price":5199,
                    //     "thumb_path":"../../../statics/imgs/sj7.jpg"
                    // }
				],
				amountMoney:0
			}
		},
		created(){
            this.getlistshop();
            
		},
		computed:{
            buyNumber(){
	            var c=this.value.filter((item)=>{
	                return item!=false;
				});
	            var amount=0;
	            console.log("value"+this.value)
	            this.value.forEach((item,index)=>{
	                if(item){
	                   var cou= Number(this.shoplist[index].cou);
	                   var price=Number(this.shoplist[index].sell_price);
	                   var itemNumTo=cou*price;
                        amount+=itemNumTo;
					}
				})
				this.amountMoney=amount;
				return c.length;
			}
		},
		methods:{
            del(id,index){
				this.value.splice(index,1);
				for(var i=0;i<this.shoplist.length;i++){
				this.shoplist.splice(index,1);
                remov(id);}
			},
            getCarCount(input){
                setCarinfo(input);
               
				for(var i=0;i<this.shoplist.length;i++){
				    var item=this.shoplist[i];

                    if(item.id==input.goodsid) {
                        if (input.type == "jia") {
                            item.cou=item.cou+1;

                        } else {
                            item.cou=item.cou-1;
                            if(item.cou<1){
                                item.cou=1;
							}
						}
						// item.cou=input.count;
                    }
				}
			},
		    getlistshop(){
                var obj=getCarinfo();
                var str=obj.str;
                
                var url="http://www.tcshop.com/index.php/Home/Goods/carlist/ids/"+str;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message)
                        return;
					}	
					data.message.forEach((item)=>{
					    item.cou=obj.result[item.id];
                     this.value.push(false);
					})
					this.shoplist=data.message;
				})
            }
		}
	}
</script>