const menus = [
  {id: '0', label: '系统首页', path: '/', icon: 'fa el-icon-s-home'},
  // 用户管理
  {
    id: 'userAdmin',
    icon: 'fa el-icon-user-solid',
    label: '用户管理',
    submenu: [
          {id: 'userList', name: 'userList', label: '用户列表'},
          {id: 'coverList', name: 'coverList', label: '封面审核'},

          {id: 'AttestationList', name: 'AttestationList', label: '认证列表'},
          {id: 'reportList', name: 'reportList', label: '举报列表'}, 
          {id: 'feedbackList', name: 'feedbackList', label: '意见反馈列表'},
          {id: 'cancelList', name: 'cancelList', label: '账号注销申请'},
    ]
  },
  // 活动管理

  {
    id: 'activity',
    icon: 'fa el-icon-s-claim',
    label: '活动管理',
    submenu: [
          {id: 'examine', name: 'examine', label: '活动审核'},
          {id: 'photo', name: 'photo', label: '活动照片'},
    ]
  },

  {
    id: 'label',
    icon: 'fa el-icon-set-up',
    label: '标签管理',
    submenu: [
      {id: 'userLabel', name: 'userLabel', label: '用户标签'},
      {id: 'CertificationLabel', name: 'CertificationLabel', label: '认证标签'},
      {id: 'activityLabel', name: 'activityLabel', label: '活动标签'},
      {id: 'evaluateLabel', name: 'evaluateLabel', label: '评价标签'},

    ]
  },
  //财务管理
  {
    id: 'Finance',
    icon: 'fa el-icon-s-ticket',
    label: '财务管理',
    submenu: [
          {id: 'RechargeAdmin', name: 'RechargeAdmin', label: '充值管理'},
          {id: 'consume', name: 'consume', label: '消费管理'},
          {id: 'reflectAdmin', name: 'reflectAdmin', label: '提现管理'},
          {id: 'profit', name: 'profit', label: '收益明细'},
          {id: 'Cashout', name: 'Cashout', label: '提现比例'},
          {id: 'RechargeRule', name: 'RechargeRule', label: '充值规则'},
          {id: 'VipRule', name: 'VipRule', label: '会员规则'},
          {id: 'chat', name: 'chat', label: '付费规则'},

    ]
  },
  {
    id: 'account',
    icon: 'fa el-icon-monitor',
    label: '权限管理',
    submenu: [
          {id: 'Account', name: 'Account', label: '账号列表'},
          
    ]
  },
  {
    id: 'configure',
    icon: 'fa el-icon-monitor',
    label: 'APP配置',
    submenu: [
          {id: 'DownloadUrl', name: 'DownloadUrl', label: '下载配置'},
          {id: 'Dataprice', name: 'Dataprice', label: '用户配置'},
          
    ]
  },
]
export default menus
