// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload,{
	loading:'/statics/imgs/timg.gif'
});



// 3.0.2 导入路由规则对应的组件对象
import Home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import car from './components/shopcar/car.vue';
// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:Home}, 
		{path:'/shopcar',component:shopcar},
		{path:'/news/newslist',component:newslist},
        {path:'/news/newsinfo/:id',component:newsinfo},
		{path:'/photo/photolist',component:photolist},
        {path:'/photo/photoinfo/:id',component:photoinfo},
		{path:'/goods/goodslist',component:goodslist},
        {path:'/goods/goodsinfo/:id',component:goodsinfo},
		{path:'/goods/goodsdesc/:id',component:goodsdesc},
		{path:'/goods/goodscomment/:id',component:goodscomment},
		{path:'/shopcar/car',component:car}
	]
	})


// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui;
Vue.use(mintui);


// 5.0 注册mui的css样式;
import '../statics/mui/css/mui.css';
import '../statics/css/site.css';


import vueResource from 'vue-resource';
Vue.use(vueResource);
//6.0 filter;
//过滤改变年月日；
import moment from "moment";
Vue.filter("datef",function(input,datefs){
    return moment(input).format(datefs);
})

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});