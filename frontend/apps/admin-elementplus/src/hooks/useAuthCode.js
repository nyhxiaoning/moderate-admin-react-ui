import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getCodeImg, getGenerateCodeImg } from '@/api/login'

// 验证码相关信息
const authCodeInfo = reactive({

  captchaEnabled: true, // 验证码开关
  loading: false, // 是否加载中
  imgUrl: '', // 验证码图片地址
  uuid: '' // 验证码唯一标识
})

/**
 * 获取图片验证码
 * @param data 表单数据
 * @param isClick 是否点击触发
 */
const getValidateCode = async (form, isClick) => {
  try {
    if ((form.userName === '' || form.userName === undefined) && isClick) {
      ElMessage.error('请输入用户账号')
      return
    }

    if ((form.password === '' || form.password === undefined) && isClick) {
      ElMessage.error('请输入用户密码')
      return
    }

    if (authCodeInfo.loading) {
      ElMessage.warning('正在请求验证码，请稍等')
      return
    }
    // const { data } = await getCodeImg()
    const data = await getGenerateCodeImg()
    console.log(data, '验证码信息')
    authCodeInfo.loading = false
    // 这里暂时没有当前的验证码开启信息，所以这里暂时给一个值
    authCodeInfo.captchaEnabled = true
    // 这里用验证码唯一的captchaId作为uuid
    authCodeInfo.uuid = data.captchaId

    if (authCodeInfo.captchaEnabled) {
      authCodeInfo.imgUrl = data.data
    }
  } catch (err) {
    console.log('验证码获取错误:', err)
  }
}

// 这里使用cookie存储信息，这里的不太安全，
// 预计升级为使用sessionStorage存储信息，jwt存储信息
// 从cookie中获取登录用户信息
const getUserCookie = (data) => {
  const userName = Cookies.get('userName')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  const form = {
    userName: userName === undefined ? data.userName : userName,
    password: password === undefined ? data.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
  return form
}

// 在Cookie中的记住用户信息,勾选了需要记住密码设置在 cookie 中设置记住用户名和密码，否则移除
const setUserCookie = (data) => {
  if (data.rememberMe) {
    Cookies.set('userName', data.userName, { expires: 30 })
    Cookies.set('password', encrypt(data.password), { expires: 30 })
    Cookies.set('rememberMe', data.rememberMe, { expires: 30 })
  } else {
    Cookies.remove('userName')
    Cookies.remove('password')
    Cookies.remove('rememberMe')
  }
}

export default { getValidateCode, getUserCookie, setUserCookie, authCodeInfo }
