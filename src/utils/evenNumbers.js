
// 防抖
const debounce = function (fn, delay,immediate) {
    let timer = null;
    return function () {
        let that = this;
        let arg = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            let bool = !timer;
            timer = setTimeout(() => {
                timer = null;
            },delay);
            if (bool) {
                fn.apply(that, arg);
            }
        } else {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(that, arg);
            },delay)
        }
    }
}

// 节流
const throttle=function(fn,delay,immediate){
    let timer=null;
    return function(){
        let that=this;
        let arg=arguments;
        if(immediate){
            if(!timer){
                timer=setTimeout(()=>{
                    timer=null;
                },delay)
                fn.apply(that,arg);
            }
        }else{
            if(!timer){
                timer=setTimeout(()=>{
                    timer=null;
                    fn.apply(that,arg);
                },delay)
            }
        }
    }
}



export { debounce,throttle };
