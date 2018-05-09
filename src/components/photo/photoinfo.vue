<style scoped>
    #title {
        padding:10px;
    }
    #title h4{
        color:#007aff;
    }
    #title p {
        margin-top:10px;
        color:rgba(0,0,0,.4);
    }
    #title .line{
        width: 100%;
        height: 1px;
        border-bottom:1px solid #999;
    }
    .mui-grid-view.mui-grid-9 {
        background-color:#fff;
        border-top: 0;
        border-left: 0;

    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right: 0;
        border-bottom: 0;
    }
    .content{
        padding:0 10px;
    }
</style>
<template>
    <div id="mgtb">
       <div id="title">
           <h4 v-text="photoinfo.title"></h4>
           <p>{{photoinfo.add_time|datef("YYYY-MM-DD HH:mm:ss")}}{{photoinfo.click}}次浏览</p>
           <p class="line"></p>
       </div>
        <!--九宫格图片-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in list">
                    <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)" >
                </li>
            </ul>
        </div>
        <div v-html="photoinfo.content" class="content"></div>
        <!--评论模块-->
        <comment :id="id"></comment>
    </div>
</template>
<script>
    import comment from "../subcom/comment.vue";
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                id: 0,
                photoinfo:{
                    /*
                    "id": 49,
                    "title": "全球首款屏下指纹手机vivo X20 Plus UD今天发布",
                    "click": 19,
                    "add_time": "2018-01-24T11:10:06.000Z",
                    "content": "在今年美国拉斯维加斯举行的CES 2018上，vivo揭晓了这项独一无二的技术。他们向与会者展示了一个采用屏幕指纹传感技术的样机。这款样机取消了以往传统的指纹识别按键，取而代之的是锁定屏幕上的解锁图标。当用户想要解锁手机时，点击该图标然后手机就会解锁。vivo称这项技术为Clear ID"*/
                },
                list:[
                    /*{
                    src: 'https://placekitten.com/600/400',
                    w: 600,
                    h: 400
                }, {
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 900
                },{
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 900
                },{
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 900
                },{
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 900
                }*/
                ]
            }
        },
        created() {
            this.id = this.$route.params.id;

            this.getDetails();
            this.getAllList();

        },
        methods: {
            getDetails() {
                var url="http://www.tcshop.com/index.php/Home/Images/getimageInfo/imgid/"+this.id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.photoinfo=data.message[0];
                })
            },
            getAllList(){
                var url="http://www.tcshop.com/index.php/Home/Images/getthumimages/imgid/"+this.id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    data.message.forEach(function(item){
                        var img=new Image(); 
                            img.src=item.src;
                            img.onload=function(){
                             item.w=img.width;
                             item.h=img.height;
                            }
                    })
                    this.list=data.message;
                })
            }

        },
        components: {
            comment
        }
    }
</script>