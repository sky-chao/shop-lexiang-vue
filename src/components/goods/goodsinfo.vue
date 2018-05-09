<style scoped>
    #lunbo,.buy,.param,.outer{
        border:1px solid #ddd;
        margin:5px;
        border-radius:5px;
    }
    .buy, .param ,.outer{
        padding:5px;
    }
    .buy h4 {
        color:#007aff;
        font-family: "黑体";
    }
    .line{
        height:1px;
        border-bottom:1px solid #6d6d72;
    }
    .buy ul,.param ul{
        padding-left:0;
    }
    .buy ul li, .param ul li{
        list-style: none;
        padding-top:10px;
    }
    .param ul li{
        padding-left:0px;
    }
    .buy ul li s {
        margin-right:20px;
    }
    .buy ul li.buycount {
        position:relative;
    }
    .buy ul li.buycount .cout {
        position:absolute;
        top:7px;
        left:90px;
    }
    .buy ul li span{
        color:red;
        font-size: 20px;
    }
    .outer .imgxq {
        margin-bottom:10px;
    }
    .param {
        padding:5px;
    }
    .ball {
        width: 20px;
        height: 20px;
        background-color:red;
        border-radius: 50%;
        position:absolute;
        top:10px;
        left:165px;
        transition: all 0.6s ease;
        z-index: 1000;
    }
</style>
<template>
    <div id="mgtb">
        <div id="lunbo">
            <slider :imgs="lunbo"></slider>
        </div>
        <div>
            <div class="buy">
                <h4 v-text="infos.title"></h4>
                <p class="line"></p>
                <ul>
                    <li>
                        市场价：<s>￥{{infos.market_price}}</s>  销售价：<span>￥{{infos.sell_price}}</span>
                    </li>
                    <li class="buycount">购买数量：
                        <inputCount class="cout" v-on:messageobj="getCount"></inputCount>
                        <transition name="show" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                            <div v-if="isshow" class="ball"></div>
                        </transition>
                    </li>
                    <li>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addshopcar">加入购物车</mt-button>
                    </li>
                </ul>
            </div>
            <div class="param">
                <h5>商品详情</h5>
                <p class="line"></p>
                <ul>
                    <li>
                        商品货号：{{infos.goods_no}}
                    </li>
                    <li>
                        库存情况：{{infos.stock_quantity}}
                    </li>
                    <li>
                        上架时间：{{infos.add_time|datef("YYYY-MM-DD HH:mm:ss")}}
                    </li>
                </ul>
            </div>
            <div class="outer">
                <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                    <mt-button class="imgxq" type="primary" size="large">图文详情</mt-button>
                </router-link>
                <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                    <mt-button type="danger" size="large">商品详情</mt-button>
                </router-link>
            </div>

        </div>
    </div>


</template>
<script>
    import {setItem,valueObj} from "../../kits/locasg.js";
    import {vms,NUMBERCOUNT} from "../../kits/vm.js";
    import slider from "../subcom/slider.vue";
    import inputCount from "../subcom/inputCount.vue";
    import { Toast } from 'mint-ui';
    export default {
        components:{
          slider, inputCount
        },
        data() {
            return {
                id:0,
                lunbo:[
                    /*
                    {
                        "url": "http://www.tcshop.com/",
                        "img": "../../../statics/imgs/hw1.jpg"
                    },
                    {
                        "url": "http://www.tcshop.com/",
                        "img": "../../../statics/imgs/hw2.jpg"
                    },
                    {
                        "url": "http://www.tcshop.com/",
                        "img": "../../../statics/imgs/hw3.jpg"
                    },
                    {
                        "url": "http://www.tcshop.com/",
                        "img": "../../../statics/imgs/hw4.jpg"
                    }*/
                ],
                infos:{

                    "id":87,
                    "title":"荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 魅焰红",
                    "add_time":new Date().toISOString(),
                    "goods_no":"SD9102356032",
                    "stock_quantity":8,
                    "market_price":1399,
                    "sell_price":1299
                },
                number:1,
                isshow:false
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.getlunboimg();
            this.getinfos();
        },
        methods:{
            //小球动画
            beforeEnter(el){
                el.style.transform="translate(0px,0px)";
            },
            enter(el,done){
                el.offsetWidth;
                el.style.transform="translate(138px,388px)"
                done();
            },
            afterEnter(el){
                this.isshow=!this.isshow;
            },
            getlunboimg(){
                var url="http://www.tcshop.com/index.php/Home/Goods/getlunbo/id/"+this.id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.lunbo=data.message;
                })
            },
            getinfos(){
                var url="http://www.tcshop.com/index.php/Home/Goods/goodsinfo/id/"+this.id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.infos=data.message[0];
                })
            },
            getCount(count){
                 this.number=count;

            },
            //购物车功能
            addshopcar(){
                vms.$emit(NUMBERCOUNT,this.number);
                valueObj.goodsid=this.id;
                valueObj.count=this.number;
                setItem(valueObj);
                //实现小球动画
                this.isshow = !this.isshow;
            }
        }
    }
</script>