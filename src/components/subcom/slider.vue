<style scoped>
    .mint-swipe{
        width: 100%;
        height: 400px;

    }
    .mint-swipe-item{
        width: 100%;
        height:400px;
    }
    .mint-swipe-item img {
        width: 100%;
    }
</style>
<template>
    <div id="mgtb">
        <mt-swipe :auto="2000">
            <mt-swipe-item  v-for="item of imgs">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:["imgs"],
        data() {
            return {

            }
        }
    }
</script>