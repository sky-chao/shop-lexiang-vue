<style scoped>
    .title,#content{
        padding:5px;
    }
    .title{
        color:#118aff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }
</style>
<template>
    <div id="mgtb">
        <div class="title">
            <h4>{{info.title}}</h4>
            <p>{{info.add_time|datef('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">
        </div>
        <comment :id="info.id" v-if="info.id"></comment>
    </div>
</template>
<script>
    import comment from "../subcom/comment.vue";
    import common from "../../kits/common.js";
    export default{
        data(){
            return {
                id:0,
                info:{}
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.getallInfo();
        },
        methods:{
            getallInfo(){
                //var url=common.apidomain+"/index.php/Home/Index/newsinfo/id/"+this.id;
                var url = 'http://www.tcshop.com/index.php/Home/News/getnew/id/' + this.id;
                this.$http.get(url).then(function(responese){
                       var data=responese.body;
                       if(data.status!=0){
                           alert(data.message);
                           return;
                       }
                       this.info=data.message[0];
                       //console.log("kk")
                })
            }
        },
        components:{
            comment
        }

    }
</script>