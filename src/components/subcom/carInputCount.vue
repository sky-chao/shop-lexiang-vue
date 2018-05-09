<style scoped>
    #zmgtb .coun {
        width: 35px;
        height: 25px;
        border:1px solid #666;
        text-align:center;
        line-height:25px;
        display: inline-block;
    }
</style>
<template>
    <div id="zmgtb">
        <span class="coun" @click="jian">-</span>
        <span class="coun" v-text="count"></span>
        <span class="coun" @click="jia">+</span>
    </div>
</template>
<script>
    export default {
        props:['initCount','goodsid'],
        data() {
            return {
                count:0,
                resobj:{"goodsid":0,"type":'add'}
            }
        },
        created(){
            this.count=this.initCount;
        },
        methods:{
            jian(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                    return;
                };

                this.sedMessage("jian");
            },
            jia(){
                this.count++;
                this.sedMessage("jia");
            },
            sedMessage(type){
                this.resobj.goodsid=this.goodsid;
                this.resobj.type=type;
                this.$emit('messageobj',this.resobj)
            }
        }
    }
</script>