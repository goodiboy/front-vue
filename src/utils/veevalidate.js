import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'
import en from 'vee-validate/dist/locale/en.json'
extend('email', email)

extend('min', min)
extend('required', required)

extend('length', length)

extend('confirmed', confirmed)

extend('password', {
  validate (value, { min, max }) {
    console.log(value, min, max)
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max']
})
localize({
  'zh-CN': {
    names: {
      email: '邮箱',
      password: '密码',
      code: '验证码',
      nickname: '昵称'
    },
    messages: {
      ...zh.messages,
      required: '请输入{_field_}',
      email: '请输入正确的邮箱格式',
      password: '密码必须是6到18位',
      confirmed: (field, params) => {
        if (field === 'password2') {
          return '两次输入的密码不一致'
        }
      }
    }
  },
  en: {
    names: {
      email: 'email',
      password: 'password'
    },
    messages: {
      ...en.messages,
      required: 'please input {_field_}',
      email: 'please input correct email',
      password: 'the password length should be 6 to 18'
    }
  }
})

localize('zh-CN')
