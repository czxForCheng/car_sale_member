import api from "@/api";

// 用户登录
export async function loginApi(username,password){
    let res = await api({
        method:'post',
        data:{username,password},
        url:'/h5Api/userManage/accountLogin',
    })

    return res.data
}

// 用户注册

export async function regApi(data){
    let res = await api({
        method:'post',
        data:data,
        url:'/h5Api/userManage/register',
    })

    return res
}

// 个人信息
export async function userManageDetail(data){
    let res = await api({
        method:'get',
        params:data,
        url:'/h5Api/userManage/detail',
    })

    return res.data
}
// 个人信息
export async function generateRandomCode(){
    let res = await api({
        method:'get',
        url:'/h5Api/userManage/generateRandomCode',
    })

    return res.data
}
// 用户等级
export async function getAllUserLevel(){
    let res = await api({
        method:'get',
        url:'/h5Api/getAllUserLevel',
    })

    return res.data
}


// 预定
export async function booking(data){
    let res = await api({
        method:'post',
        data:data,
        url:'/h5Api/booking/pushOrder',
    })

    return res.data
}

// 订单列表
export async function bookingList(data){
    let res = await api({
        method:'get',
        params:data,
        url:'/h5Api/order/listById',
    })

    return res.data
}
// 充值记录
export async function rechargeHistory(data){
    let res = await api({
        method:'get',
        // params: {userId:data},
        url:`/h5Api/finance/rechargeRecord/${data}`,
    })

    return res.data
}
// 客服列表
export async function chatList(data){
    let res = await api({
        method:'get',
        url:`/h5Api/customerService/${data}`,
    })

    return res.data
}
// 提现记录
export async function withdrawalRecord(data){
    let res = await api({
        method:'get',
        url:`/h5Api/finance/withdrawalRecord/${data}`,
    })

    return res.data
}
// 完善钱包
export async function improveWallet(data){
    let res = await api({
        method:'post',
        data:data,
        url:`/h5Api/finance/improveWallet`,
    })

    return res.data
}
// 提现
export async function withdrawalFinance(data){
    let res = await api({
        method:'post',
        data:data,
        url:`/h5Api/finance/withdrawal`,
    })

    return res.data
}
// 修改密码
export async function updatePassword(data){
    let res = await api({
        method:'post',
        data:data,
        url:`/h5Api/updPwd`,
    })

    return res.data
}
// 强制付款
export async function payOrderForce(data){
    let res = await api({
        method:'get',
        params: {id:data},
        url:`/h5Api/order/force`,
    })

    return res
}
// 获取随机商品
export async function pushProduct(data){
    let res = await api({
        method:'post',
        data: {username:data},
        url:`/h5Api/booking/pushProduct`,
    })

    return res
}

// 付款
export async function payOrderPrice(data){
    let res = await api({
        method:'post',
        // data: {username:data,productPrice:price},
        data:data,
        url:`/h5Api/booking/pushOrder`,
    })

    return res
}
// 更改订单状态
export async function editStatus(id,status,username,amount,orderNum){
    let res = await api({
        method:'get',
        params :{id:id},
        url:`/h5Api/order/editStatus`,
    })

    return res
}

// 首页文本获取
export async function homepageText(){
    let res = await api({method:'get', url:`/h5Api/textConfig/textContent`,})

    return res.data
}

// 获取验证码
export async function obtainVerificationCode(){
    let res = await api({method:'get', url:`/h5Api/userManage/captcha`,})

    return res.data
}


// 首页banner图
export async  function getWebsiteInfo(){
    let res = await api({
        url:'/h5Api/configuration/list',
        method:'get'
    })

    return res.data
}

// 轮播图列表
export async function getBannerList() {
    let res = await api({
        url: '/h5Api/banner/list',
        method: 'get'
    })
    return res.data
}

// 获取菜单列表
export async  function homeList(){
    let res = await api({
        url:'/h5Api/help/home/list',
        method:'get',
        headers:{
            'lang-admin':localStorage.getItem('language')
        }
    })

    return res.data
}
// 获取菜单详情
export async  function contentDetail(data){
    let res = await api({
        url:'/h5Api/help/home/item',
        params:data,
        method:'get'
    })

    return res.data
}
// 获取语言
export async  function getLanguageInfo(data){
    let res = await api({
        url:'/h5Api/getLanguageOptions',
        method:'get'
    })

    return res.data
}

// 广告
export async function announcementList(){
    let res = await api({
        method:'get',
        url:`/h5Api/help/home/announcement`,
    })

    return res
}
// logo
export async function getWebLogo(){
    let res = await api({
        method:'get',
        url:`/h5Api/configuration/list`,
    })

    return res.data
}
// 退出登录
export async function leaveLogin(){
    let res = await api({
        method:'post',
        url:`/h5Api/userManage/kickOut`,

    })

    return res.data
}
// 奖品列表
export async function prizeList(id){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/prizeList`,
        params:{drawId:id}
    })

    return res.data
}
// 活动列表
export async function drawList(){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/drawList`,
    })

    return res.data
}
// 抽奖
export async function lottery(id){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/lotto`,
        params:{drawId:id}
    })

    return res.data
}
// 剩余抽奖次数
export async function lotteryGetNum(id){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/getNum`,
        params:{drawId:id}
    })

    return res.data
}
// 获取中间用户列表
export async function lottoList(id){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/lottoList`,
        params:{drawId:id}
    })

    return res.data
}
// 获取登录的页面信息
export async function getBaseImages(){
    let res = await api({
        method:'get',
        url:`/h5Api/lottery/lottoList`,
    })

    return res.data
}

// 首页banner图
export async function HomeBannerImage(){
    let res = await api({
        method:'get',
        url:`/h5Api/banner/pcList`,
    })

    return res.data
}
// 小的banner图片
export async function bannerList(data){
    let res = await api({
        method:'post',
        url:`/h5Api/banner/bannerList`,
        data:data
    })

    return res.data
}

