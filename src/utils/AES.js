import CryptoJS from 'crypto-js'

const key = '1234567890123456'


export function encrypt(content) {
    const ciphertext = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Base64.stringify(ciphertext.ciphertext)
}

export function decrypt(content) {
    const bytes = CryptoJS.AES.decrypt(content, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return bytes.toString(CryptoJS.enc.Utf8)
}
