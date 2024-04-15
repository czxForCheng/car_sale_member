import Vue from 'vue'
import VueRouter from 'vue-router'
import {getItem} from "@/utils/auth";


Vue.use(VueRouter)

const routesMb = [
    {path: '/', name: 'home', component: () => import('../views/homePage/index.vue')},
    {path: '/mine', name: 'mine', component: () => import('../views/pageMine/index.vue')},
    {path: '/faqs', name: 'faqs', component: () => import('../views/Pageinformation/index.vue')},
    {path: '/task', name: 'task', component: () => import('../views/PageTask/index.vue')},
    {path: '/order', name: 'order', component: () => import('../views/PageOrder/index.vue')},
    {path: '/recharge', name: 'recharge', component: () => import('../views/pageRecharge/index.vue')},
    {path: '/withdraw', name: 'withdraw', component: () => import('../views/pageWithdraw/index.vue')},
    {path: '/wallet', name: 'wallet', component: () => import('../views/pageWallet/index.vue')},
    {path: '/security', name: 'security', component: () => import('../views/pageSecurity/index.vue')},
    {path: '/invitation', name: 'invitation', component: () => import('../views/pageInvitation/index.vue')},
    {path: '/chat', name: 'chat', component: () => import('../views/pageCustomer/index.vue')},
    {path: '/login', name: 'login', component: () => import('../views/pageLogin/index.vue')},
    {path: '/reg', name: 'login', component: () => import('../views/pageRegister/index.vue')},
    {path: '/deal', name: 'deal', component: () => import('../views/pageDeal/index.vue')},
    {path: '/activity', name: 'activity', component: () => import('../views/pageActivity/index.vue')},
    {path: '*', name: 'activity', component: () => import('../views/notPage/index.vue')},
]
const routesPc = [
    {path: '/', name: 'home', component: () => import('../page/home/index.vue')},
    {path: '/login', name: 'login', component: () => import('../page/login/index.vue')},
    {path: '/reg', name: 'reg', component: () => import('../page/register/index.vue')},
    {path: '/faqs', name: 'faqs', component: () => import('../page/Faqs/index.vue')},
    {path: '/task', name: 'task', component: () => import('../page/Task/index.vue')},
    {path: '/order', name: 'order', component: () => import('../page/order/index.vue')},
    {path: '/recharge', name: 'recharge', component: () => import('../page/recharge/index.vue')},
    {path: '/withdraw', name: 'withdraw', component: () => import('../page/withdraw/index.vue')},
    {path: '/wallet', name: 'wallet', component: () => import('../page/wallet/index.vue')},
    {path: '/security', name: 'security', component: () => import('../page/security/index.vue')},
    {path: '/invitation', name: 'invitation', component: () => import('../page/Invitiation/index.vue')},
    {path: '/chat', name: 'chat', component: () => import('../page/customer/index.vue')},
    {path: '/deal', name: 'deal', component: () => import('../page/deal/index.vue')},
    {path: '*', name: 'activity', component: () => import('../page/notPage/index.vue')},
]

var routes=[]
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    routes = routesMb
} else {
    routes = routesPc
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }),//每次都跳转到顶部
})

router.beforeEach((to, from, next) => {
    // 读取数据
    let token = getItem('admin');
    let user = getItem('BaseUser')
    if(token && user){
        next();
    }else{
        let reg = RegExp('reg|pc|login|50x')
        if (reg.test(to.path)){
            next()
        } else{
           router.replace('/login')
        }
    }
})
export default router
