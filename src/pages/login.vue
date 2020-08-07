<template>
<div class="fullscreen">
  <div class="login-box">
    <div style="text-align: center">
      <img src="../assets/logo/logo.png" alt="" class="logo">
      <span class="spans">撩呗管理后台</span>
    </div>
    <p class="text-tips">账号密码登录</p>
    <form action="" class="login-form">
      <div class="m-list-group">
        <div class="m-list-group-item">
          <input type="text" placeholder="用户名" class="m-input" v-model="username">
        </div>
        <div class="m-list-group-item">
          <input type="password" placeholder="密码" class="m-input" v-model="password">
        </div>
      </div>
      <!-- <p class="text-tips">免密码，点击登录按钮进入</p> -->
      <button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>
    </form>
    <div style="margin-top: 50px"></div>
    <!-- <p class="text-tips">
      <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
      <span class="footer-text">{{appName}} &nbsp;<el-tag size="mini">{{version}}</el-tag> <br>©make by <a href="https://www.github.com/mengdu" target="_blank">{{author}}</a>
  </span>
    </p> -->
  </div>
</div>
</template>
<script>
import {mapActions} from 'vuex'
import { logins } from "@/api/login";

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      isLoging: false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLogin () {
      if (!this.username || !this.password) {
        return this.$message.warning('用户名和密码不能为空')
      }
      this.isLoging = true
      

      const that = this;
      logins(that).then(res=> {
        if(res.code == 200) {
          
          that.login({
            username: that.username,
            password: that.password
          }).then(res => {
               that.$message.success('登录成功')
                that.$router.push({name: 'home'})
              that.isLoging = false;
          })
        }
      })
    }
  }
}
</script>
<style type="text/css">
  .m-list-group{
    border-radius: 3px;
    padding: 0;
    margin: 0 0 60px;
  }
  .m-list-group .m-list-group-item{
    position: relative;
    display: block;
    padding: 4px 10px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #e7ecee;
    margin: 16px 0px 24px 0px;
  }
  .m-list-group .m-list-group-item:first-child{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .m-list-group .m-list-group-item:last-child{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .fullscreen{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #F4F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-box{
    position: relative;
    width: 400px;
    margin: 0 auto;
    padding: 0px 15px;
  }
  .login-box .logo{
    max-width: 18%;
    /* margin-bottom: 30px; */
  }
  .spans {
    display: inline-block;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    margin-left: 20px;
    margin-top: 12px;

  }
  .login-box .text-tips{
    text-align: center;
    color: #1890FF;
  }
  .login-box .m-input{
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .login-box .m-btn{
    font-size: 18px;
    width: 100%;
    color: #fff;
    background-color: #36c1fa;
    display: inline-block;
    padding: 10px 12px;
    margin-bottom: 5px;
    line-height: 1.42857143;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    border: 1px solid #36c1fa;
    box-sizing: border-box;
    text-decoration: none;
  }
  .login-box .m-btn.m-btn-text{
    background: #fff;
    color: #36C1FA;
  }
  .login-box .m-btn:hover{
    background-color: #2DB7F5;
  }
  .login-box .m-btn.m-btn-text:hover{
    background-color: #F4F5F5;
  }
  .login-box .m-btn:active{
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .login-box{
      width: auto;
    }
  }
</style>
