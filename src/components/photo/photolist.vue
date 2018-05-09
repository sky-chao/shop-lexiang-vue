<style scoped>
    .nav {
        width: 400px;
        max-width: 400px;
        overflow-x: auto;
    }
    .nav ul{
        margin:0;
        padding-left:5px;
        width: 1000px;
    }
    .nav li{
        list-style: none;
        display: inline-block;
        color:#007aff;
        font-size: 14px;
        margin-left:9px;
    }
    #imglist ul{
        padding-left:0px;
    }
    #imglist li{
        list-style: none;
        position:relative;
    }
    #imglist li img {
        width: 100%;
        height: 300px;
    }
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .jianjie{
        background-color:rgba(0,0,0,.4);
        position:absolute;
        bottom:5px;
        left:2px;

    }
    .jianjie h5{
        font-weight: bold;
        font-size: 20px;
        color:#fff;
    }
    .jianjie p{
        color:#fff;
        margin:0;
    }
</style>
<template>
    <div id="mgtb">
        <div class="nav">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getClassifyList(0)">全部</li>
                <li v-for="item in classify" v-text="item.title" @click="getClassifyList(item.id)"></li>
            </ul>
        </div>
        <div id="imglist">
            <ul>
               <li v-for="item in imglist">
                    <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="item.img_url">
                        <div class="jianjie">
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
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
        data(){
            return {
                classify:[],
                ulWidth:375,
                imglist:[
                    // {
                    //     'id':49,
                    //     'title':"全球首款屏下指纹手机vivo X20 Plus UD今天发布",
                    //     'img_url':'../../statics/imgs/ee.jpg',
                    //     'zhaiyao':'全球首款可用于量产的屏下指纹解锁手机终于有了名字和确定的“出生日期”。vivo通过官方渠道宣布X20 Plus UD将于1月24日在中国正式开始销售。'
                    //
                    // },
                    // {
                    //     'id':50,
                    //     'title':"去掉“齐刘海”的iPhoneX，是全球最好看的全面屏手机吗？",
                    //     'img_url':'../../statics/imgs/px.jpg',
                    //     'zhaiyao':'iPhoneX虽然因为技术原因，不得不采用“齐刘海”的造型，不过这个“齐刘海”里面的元器件，才是这款机器最尖端的科技所在。'
                    //
                    // }
                 ]
            }
        },
        created(){
            this.getClassify();
            var all=0;
            this.getClassifyList(all);
        },
        methods:{
            //http://www.tcshop.com/index.php/Home/Index/imgcate
            //http://www.tcshop.com/index.php/Home/Index/cateimages/cateid/3

            getClassify(){
                //var url='http://www.tcshop.com/index.php/Home/Index/imgcate';
                var url = 'http://www.tcshop.com/index.php/Home/Images/getimgcategory';
                this.$http.get(url).then(function(res){
                    this.classify=res.body.message
                    this.ulWidth=(res.body.message.length+1)*65
                })
            },
            getClassifyList(id){
                //var url="http://www.tcshop.com/index.php/Home/Index/cateimages/cateid/"+id;
                var url = 'http://www.tcshop.com/index.php/Home/Images/getimages/cateid/' + id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.imglist=res.body.message;
                    console.log(0);
                })
            }

        }
    }
</script>