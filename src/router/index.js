import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
        // 用户管理
        {path: '/userList', name: 'userList', component: page('userAdmin/userList')}, 
        {path: '/AttestationList', name: 'AttestationList', component: page('userAdmin/AttestationList')},
        {path: '/reportList', name: 'reportList', component: page('userAdmin/reportList')},
        {path: '/feedbackList', name: 'feedbackList', component: page('userAdmin/feedbackList')}, 
        {path: '/cancelList', name: 'cancelList', component: page('userAdmin/cancelList')},
        {path: '/coverList', name: 'coverList', component: page('userAdmin/coverList')},


        // 标签管理
        {path: '/userLabel', name: 'userLabel', component: page('label/userLabel')},
        {path: '/CertificationLabel', name: 'CertificationLabel', component: page('label/CertificationLabel')},
        {path: '/activityLabel', name: 'activityLabel', component: page('label/activityLabel')},
        {path: '/evaluateLabel', name: 'evaluateLabel', component: page('label/evaluateLabel')},

        // 活动管理
        {path: '/examine', name: 'examine', component: page('activity/examine')},
        {path: '/photo', name: 'photo', component: page('activity/photo')},
        // 账号管理
        {path: '/Account', name: 'Account', component: page('account/Account')},
        // 财务管理
        {path: '/RechargeRule', name: 'RechargeRule', component: page('Finance/RechargeRule')},
        {path: '/RechargeAdmin', name: 'RechargeAdmin', component: page('Finance/RechargeAdmin')},
        {path: '/VipRule', name: 'VipRule', component: page('Finance/VipRule')},
        {path: '/reflectAdmin', name: 'reflectAdmin', component: page('Finance/reflectAdmin')},
        {path: '/consume', name: 'consume', component: page('Finance/consume')},
        {path: '/chat', name: 'chat', component: page('Finance/chat')},
        {path: '/Cashout', name: 'Cashout', component: page('Finance/Cashout')},
        {path: '/profit', name: 'profit', component: page('Finance/profit')},

        //app配置
        {path: '/DownloadUrl', name: 'DownloadUrl', component: page('configure/DownloadUrl')},
        {path: '/Dataprice', name: 'Dataprice', component: page('configure/Dataprice')},

      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/changePassword', name: 'changePassword', component: page('changePassword')},

    // {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages

  ]
})
