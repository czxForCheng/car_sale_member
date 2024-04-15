import {decrypt} from "@/utils/AES";


let limitConnect=3
let timeConnect=0
let timerWs =null // ping长连接 定时器
let SendMessage=''
let Socket=''
var parsedURL = new URL(location.href);
var hostname = parsedURL.hostname;
var port = parsedURL.port;
let s = /https/.test(location.href) ? 'wss://':'ws://'
let socketUrl=process.env.VUE_APP_WEBSOCKET ? process.env.VUE_APP_WEBSOCKET:s+hostname+':'+port+'/webSocket/'


// 创建一个socket连接

export const connectSocket =(url)=>{
    let user = localStorage.getItem('user')
    let r = JSON.parse(decrypt(user))
    if (url){
        Socket=new WebSocket(socketUrl+ url)
        // 连接心跳
        Socket.onopen=onOpenSocket
        // 接受消息
        Socket.onmessage=getMessage
        // 断线重连
        Socket.onclose=onCloseWs
    }else{
        Socket=new WebSocket(socketUrl+r.id)
        // 连接心跳
        Socket.onopen=onOpenSocket
        // 接受消息
        Socket.onmessage=getMessage
        // 断线重连
        Socket.onclose=onCloseWs
    }

}


const onOpenSocket=()=>{
    // 发送心跳
    socketSendPing()
}

// 接受消息
const getMessage=(e)=>{
    window.dispatchEvent(
        new CustomEvent('getMessage', {
            detail: {
                data: e.data
            }
        }))


    // if (e.data==='pong'){
    //   closeSocketWs()
    // }
}

const onCloseWs=()=>{
    reconnectWs()
}

export function reconnectWs() {
    if (limitConnect > 0) {
        limitConnect--
        timeConnect++
        console.log(`第${timeConnect}次重连`)
        setTimeout(() => {
            connectSocket()
        }, 2000)
    } else {
        console.log('webSocket timeout')
    }
}

// 断开连接
export function closeSocketWs() {

    if (Socket){
        Socket.close()
        Socket=null
        limitConnect=0
        console.log('close')
    }

}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const  sendWSPush =  message => {
    if (Socket.readyState===1){
        Socket.send(message)
    }else{
        SendMessage=message
    }
}


export function socketSendPing() {

    if (SendMessage===''){
        let time=3000;
        let ping="ping"
        if (timerWs){
            clearInterval(timerWs)
            timerWs=null
        }
        timerWs=setInterval(()=>{
            console.log('socket connect')
            if (Socket){
                Socket.send(ping)
            }else{
                connectSocket()
            }
        },time)
    }else {
        Socket.send(SendMessage)
        SendMessage=''
    }


}
