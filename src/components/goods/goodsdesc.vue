<style scoped>
    #title ,.content {
        margin:5px;
    }
    #title h4 {
        color:#007aff;
    }
    #title p {
        height:1px;
        border-bottom:1px solid #ccc
    }
</style>
<template>
    <div id="mgtb">
        <div id="title">
            <h4 v-text="info.title"></h4>
            <p></p>
        </div>
        <div class="content" v-html="info.content">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info:{
                    /*
                    "title":'荣耀 畅玩7X 4GB+32GB 全网通4G全面屏手机 标配版 魅焰红',
                    "content":"<p style=\"{font-size: 14px; line-height:20px}\">\n" +
                    "            \\r\\n\\t 华为荣耀7X,手感第一感觉完美，握持感更好，双摄像头照相超清，性能系统流畅，消消乐，王者荣耀，毫无压力。商品毛重：370.00g商品产地：中国大陆系统：安卓（Android）机身厚度：薄（7mm-8.5mm）拍照特点：智能拍照，后置双摄像头电池容量：3000mAh-3999mAh机身颜色：深蓝色系运行内存：4GB前置摄像头像素：800万-1599万。\n" +
                    "            <span>\n" +
                    "                <img style=\"{width:100%;}\" src=\"../../../statics/imgs/hw8.jpg\">\n" +
                    "            </span>\n" +
                    "        </p>\n" +
                    "        <p style=\"{font-size: 14px; line-height:20px}\">外形屏幕7x材质很好，相比起以前的荣耀畅玩5x等等旧型号的机子，荣耀畅玩7X的进步就立显了。</p>"*/
                },
                id : 1,
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.getgoodsdesc();
        },
        methods:{
            getgoodsdesc(){
                var url="http://www.tcshop.com/index.php/Home/Goods/getgoodsdesc/id/" + this.id;
                this.$http.get(url).then(function(res){
                    var data=res.body;
                    if(data.status!=0){
                        Toast(data.message);
                        return;
                    }
                    this.info = data.message[0];

                })
            }
        }
    }
</script>