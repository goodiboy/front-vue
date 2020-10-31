<template>
  <div id="app">
    <div class="layui-container">
      <ValidationObserver>
        <form class="layui-form layui-form-pane" action>
          <ValidationProvider class="layui-form-item" name="email" tag="div" rules="required|email" v-slot="{ errors }">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-block">
              <input
                  type="text"
                  name="name"
                  v-model="name"
                  placeholder="请输入标题"
                  autocomplete="off"
                  class="layui-input"
              />
            </div>
            <div class="error layui-form-mid">{{errors[0]}}</div>
          </ValidationProvider>
          <ValidationProvider class="layui-form-item" name="password" tag="div" rules="required|password:6,18" v-slot="{ errors }">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-block">
              <input
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="请输入密码"
                  autocomplete="off"
                  class="layui-input"
              />
            </div>
            <div class="error layui-form-mid">{{errors[0]}}</div>
          </ValidationProvider>
          <ValidationProvider class="layui-form-item" name="code" tag="div" rules="required|length:4" v-slot="{ errors }">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-block">
              <div class="layui-input-inline">
                <input
                    type="text"
                    name="code"
                    v-model="code"
                    placeholder="请输入验证码"
                    autocomplete="off"
                    class="layui-input"
                />
              </div>
              <div class="svg layui-input-inline" @click="getCaptcha()" v-html="svg"></div>
            </div>

            <div class="error" style="margin-top: 5px">{{errors[0]}}</div>
          </ValidationProvider>
          <button type="button" class="layui-btn" @click="checkForm">点击登陆</button>
          <a class="imooc-link" href="http://www.layui.com">忘记密码</a>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import './utils/veevalidate'

export default {
  name: 'app',
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then((res) => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.svg = res.data.data
          }
        }
      })
    },
    checkForm () {
      this.errorMsg = []
      // regEx email
      if (!this.name) {
        this.errorMsg.push('登录名为空！')
      }
      if (!this.password) {
        this.errorMsg.push('密码不得为空！')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}

.layui-container {
  background: #fff;
}

input {
  width: 190px;
}

.imooc-link {
  margin-left: 10px;

  &:hover {
    color: #009688;
  }
}

.svg {
  position: relative;
  //float: left;
  height: 38px;
}
</style>
