<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver>
                <ValidationProvider class="layui-form-item" name="email" tag="div" rules="required|email" v-slot="{ errors }" >
                  <label  class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <input
                        type="text"
                        v-model="username"
                        placeholder="请输入用户名"
                        autocomplete="off"
                        class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="nickname" tag="div" rules="required|length:2" v-slot="{ errors }" >
                  <label  class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <input
                        type="text"
                        v-model="nickname"
                        placeholder="请输入昵称"
                        autocomplete="off"
                        class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
                <!-- vid 是两次密码是否一致的关联绑定 -->
                <ValidationProvider class="layui-form-item" name="password" vid="password" tag="div" rules="required|password:6,18" v-slot="{ errors }">
                  <label  class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input
                        type="password"
                        v-model="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
                <!-- confirmed:{vid} 进行判断绑定 -->
                <ValidationProvider class="layui-form-item" tag="div" name="password2"  rules="confirmed:password" v-slot="{ errors }">
                  <label  class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input
                        type="password"
                        v-model="password2"
                        placeholder="请输入再次密码"
                        autocomplete="off"
                        class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider class="layui-form-item" name="code" tag="div" rules="required|length:4" v-slot="{ errors }">
                  <div class="layui-row">
                    <label  class="layui-form-label">验证码</label>
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
                    <div class>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </ValidationProvider>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '@/utils/veevalidate'
import { getCode } from '@/api/login'
export default {
  name: 'reg',
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      code: '',
      svg: '',
      nickname: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      getCode().then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -4px;
}
</style>
