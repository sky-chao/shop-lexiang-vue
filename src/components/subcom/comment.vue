<style scoped>
    #postcomment {
        padding:5px;
    }
    .p{
        height: 1px;
        width: 100%;
        border-bottom:1px solid #bfbfbf;
    }
    #list{
        padding:5px;
    }
    .title{
        background-color:rgba(0,0,0,.1);
        padding:5px;
        line-height:25px;
        color:rgba(0,0,0,.6);
    }
</style>
<template>
    <div id="mgtb">
        <div id="postcomment">
            <h3>提交评论</h3>
            <p class="p"></p>
            <textarea placeholder="请输入您的评论内容" v-model="postcomment"></textarea>
            <mt-button type="primary" size="large" @click="postdatacomment">发表</mt-button>
        </div>

        <div id="list">
            <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in list">
                <div class="title">
                    <span>{{index+1}}楼</span>
                    <span>发表时间：{{item.user_name}}</span>
                    <span>{{item.add_time|datef('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
        </div>

        <!--点击加载更多-->
        <mt-button plain size="large" type="danger" @click="morelist">more</mt-button>
    </div>
</template>
<script>
    import common from "../../kits/common";
    import { Toast } from 'mint-ui';
    export default {

        data(){
            return {
                pageindex:1,
                postcomment:'',
                list:[
                    // {"user_name":"匿名用户","add_time":"2017-04-10T08:28:08.000Z","content":"sadsakdjasi"},
                    // {"user_name":"匿名用户1","add_time":"2017-04-10T08:28:08.000Z","content":"sadsakdjasi"}
                ]
            }
        },
        props:['id'],
        created(){
            this.getallcomment(this.pageindex);
        },
        methods: {
            //点击加载更多
            morelist(){
                this.pageindex++;
                this.getallcomment(this.pageindex);

            },
            //获取次文章的评论条目
            getallcomment(pageindex){
                this.pageindex=pageindex?pageindex:1;
                var url='http://www.tcshop.com/index.php/Home/Index/getcomment/artid/'+this.id+'/p/'+pageindex;
                this.$http.get(url).then(function(res){
                    if(res.body.status!=0){
                        Toast(res.body.message);
                        return;
                    }
                    this.list=this.list.concat(res.body.message);
                })
                console.log(this.id);

            },
            //提交填写的评论数据
            postdatacomment() {
                if(this.postcomment.trim().length<=0){
                    Toast("您要评论的内容不能为空");
                }
                //http://www.tcshop.com/index.php/Home/Index/subcomment/artid/
                var url = 'http://www.tcshop.com/index.php/Home/Index/subcomment/artid/' + this.id;
                this.$http.post(url, {
                    'user_name':'匿名用户',
                    'add_time':new Date().toISOString(),
                    'content': this.postcomment,

                }, {emulateJSON: true}).then(function (res) {
                    var data = res.body;
                    Toast(data.message);
                })
                this.list=[{
                    "user_name":"匿名用户",
                    "add_time":new Date(),
                    "content":this.postcomment
                }].concat(this.list);
                this.postcomment="";
            }
        }
    }
</script>