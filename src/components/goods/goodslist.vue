<style scoped>

    #mui-content li {
        border:1px solid #eee;
        /*box-shadow: 0 0 1px #000 ;*/
        margin-left:4px;
        padding-left:0px;
        margin-top:1px;
        padding:5px;

    }
    #mui-content .mui-media-body{
        color:#0094ff;
    }
    #mui-content .desc {
        text-align: left;
        height:60px;
        background-color:rgba(0,0,0,0.2);

    }
    #mui-content .desc .price {
        margin-top:10px;
        padding-top: 5px;
        padding-left:5px;

    }
    #mui-content .desc .price span{

        color:red;
        margin-right:15px;
    }
    #mui-content .desc .price s {
        color:#6d6d72;
    }
    #mui-content .desc .mai span{
        position:absolute;
        bottom:5px;
        font-weight: bold;
        color:#6d6d72;
    }
    #mui-content .desc .mai .fr{


        right:10px;
    }
    #mui-content .desc .mai .fl{


        left:10px;
    }
    #mui-content a {
        padding-left:0px;
        margin-left:0px;
        margin-top:0px;
    }
</style>
<template>
    <div id="mgtb">
        <!--商品展示区-->
        <div  id="mui-content" class="mui-content"  style="background-color:#fff;border: none">
            <ul id="ulist" class="mui-table-view mui-grid-view">
                <li  v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
                        <img class="mui-media-object" v-lazy="item.img_url">
                        <div class="mui-media-body" v-text="item.title">想要一间这样的木屋，静静的喝咖啡</div>
                        <div class="desc">
                            <p class="price">
                                <span >￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p class="mai ">
                                <span class="fl">热卖中</span>
                                <span class="fr">仅剩{{item.stock_quantity}}件</span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                list:[
                    // {
                    //     "id":87,
                    //     "title":"荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 魅焰红",
                    //     "add_time":new Date().toISOString(),
                    //     "zhaiyao":"1600万高清双摄！全系4GB大内存！",
                    //     "click":0,
                    //     "img_url":"../../../statics/imgs/sj6.jpg",
                    //     "sell_price":1299,
                    //     "market_price":1399,
                    //     "stock_quantity":8
                    // },
                    // {
                    //     "id":88,
                    //     "title":"Apple iPhone 7 Plus (A1661) 32G 玫瑰金色 移动联通电信4G手机",
                    //     "add_time":new Date().toISOString(),
                    //     "zhaiyao":"勾选[保障服务][原厂保2年]获得AppleCare+全方位服务，原厂延保更安心.",
                    //     "click":0,
                    //     "img_url":"../../../statics/imgs/sj7.jpg",
                    //     "sell_price":5199,
                    //     "market_price":6189,
                    //     "stock_quantity":60
                    // }

                ]
            }
        },
        created(){
            this.getShopList();

            },
        methods:{
            getShopList(){
                var url="http://www.tcshop.com/index.php/Home/Goods/getgoods/";
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.list=data.message;

                })
            }
        }
    }
</script>