<style scoped>
    #zmgtb .coun {
        width: 60px;
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
        data() {
            return {
                count:1,
            }
        },
        methods:{
            jian(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                };
                this.sedMessage();
            },
            jia(){
                this.count++;
                this.sedMessage();
            },
            sedMessage(){
                this.$emit('messageobj',this.count)
            }
        }
    }
</script>