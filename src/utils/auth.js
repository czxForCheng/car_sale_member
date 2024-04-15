// 封装本地存储模块

// 存储数据
export const setItem = (key, val) => {
    // 对象或数组要进行转换
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
}

// 获得数据
export const getItem = (key) => {
    const data = localStorage.getItem(key)
    // 处理localStorage内的数据
    // 不需要async
    try {
        return JSON.parse(data)
    } catch {
        return data
    }
}

// 删除数据
export const removeItem = (key) => {
    localStorage.removeItem(key)
}