<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <van-cell-group>
      <ValidationObserver ref="loginFormRef">
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <van-field
            v-model="loginForm.mobile"
            label="手机号"
            type="text"
            placeholder="请输入手机号"
            required
            clearable
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
          <van-field
            v-model="loginForm.code"
            label="验证码"
            type="password"
            placeholder="请输入验证码"
            required
            clearable
            :error-message="errors[0]"
          >
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="login-btn">
      <van-button
        size="small"
        type="info"
        block
        round
        @click="login()"
        :loading="isLogin"
        loading-text="登录中..."
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { apiUserLogin } from '@/api/user.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'user-login',
  components: {
    // 注册
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      isLogin: false
    }
  },
  methods: {
    async login () {
      const valid = await this.$refs.loginFormRef.validate()
      if (!valid) {
        // 校验失败，停止后续代码执行
        return false
      }
      // 使得按钮变为加载中
      this.isLogin = true
      try {
        const result = await apiUserLogin(this.loginForm)
        this.$store.commit('updateUser', result)
        this.$toast.success('登录成功')
        // 页面跳转
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('手机号或验证码错误' + err)
      }
      // 使得按钮变为正常状态
      this.isLogin = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  margin: 40px;
}
</style>
