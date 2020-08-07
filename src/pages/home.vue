<template>
  <div class="body">
    <!-- 登录提示 -->
    <div class="tishi" v-show="head_show">
      <img src="../assets/home/icon.png" alt />
      <span>欢迎使用撩呗后台管理系统（V1.0.0），你本次登录时间为{{time}}</span>
      <span class="el-icon-close del" @click="guanbi"></span>
    </div>
    <!-- 用户统计 -->
    <div class="head_box">
      <div class="head_box_count">
        <div class="head_box_left qing">
          <img src="../assets/home/04.png" alt />
        </div>
        <div class="head_box_right">
          <h3>{{arr.todayReg}}</h3>
          <span>今日注册人数</span>
        </div>
      </div>
      <div class="head_box_count">
        <div class="head_box_left red">
          <img src="../assets/home/03.png" alt />
        </div>
        <div class="head_box_right">
          <h3>{{arr.todayCertification}}</h3>
          <span>今日认证人数</span>
        </div>
      </div>
      <div class="head_box_count">
        <div class="head_box_left yellow">
          <img src="../assets/home/02.png" alt />
        </div>
        <div class="head_box_right">
          <h3>{{arr.todayChargeAndroidCount+arr.todayChargeIosCount}}</h3>
          <span>今日总充值</span>
        </div>
      </div>
      <div class="head_box_count">
        <div class="head_box_left blue">
          <img src="../assets/home/01.png" alt />
        </div>
        <div class="head_box_right">
          <h3>{{Math.floor((arr.allChargeAndroidCount + arr.allChargeIosCount) * 100) / 100 }}</h3>
          <span>总充值</span>
        </div>
      </div>
    </div>
    <!-- 卡片展示 -->
    <div class="ban_card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日注册统计</span>
        </div>
        <div class="item">
          <span class="widths">男性：</span>
          <span class="orange">{{arr.todayRegBoy}} </span>
          <span> 人</span>
        </div>
        <div class="item">
          <span class="widths">女性：</span>
          <span class="orange">{{arr.todayRegGirl}} </span>
          <span> 人</span>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日认证统计</span>
        </div>
        <div class="item">
          <span class="widths">男性：</span>
          <span class="orange">{{arr.todayCertificationBoy}} </span>
          <span> 人</span>
        </div>
        <div class="item">
          <span class="widths">女性：</span>
          <span class="orange">{{arr.todayCertificationGirl}} </span>
          <span> 人</span>
        </div>
      </el-card>
      <el-card class="box-card chongzhi">
        <div slot="header" class="clearfix">
          <span >今日充值统计</span>
        </div>
        <div class="item">
          <span class="widths">充值人数：</span>
          <span class="orange">{{arr.todayChargeUserCount}} </span>
          <span> 人</span>
        </div>
        <div class="item">
          <span class="widths">充值笔数：</span>
          <span class="orange">{{arr.todayChargeOrderCount}} </span>
          <span> 笔</span> 
        </div>
           <div class="item">
          <span class="widths">苹果充值金额：</span>
          <span class="orange">{{arr.todayChargeIosCount}}</span>
          <span> 元</span>
        </div>
           <div class="item">
          <span class="widths">安卓充值金额：</span>
          <span class="orange">{{arr.todayChargeAndroidCount}} </span>
          <span> 元</span>
        </div>
      </el-card>
      <el-card class="box-card chongzhi">
        <div slot="header" class="clearfix">
          <span>总充值统计</span>
        </div>
        <div class="item">
          <span class="widths">总充值人数：</span>
          <span class="orange">{{arr.allChargeUserCount}} </span>
          <span> 人</span>
        </div>
        <div class="item">
          <span class="widths">总充值笔数：</span>
          <span class="orange">{{arr.allChargeOrderCount}} </span>
          <span> 笔</span>
        </div>
            <div class="item">
          <span class="widths">苹果总充值金额：</span>
          <span class="orange">{{arr.allChargeIosCount}} </span>
          <span> 元</span>
        </div>
           <div class="item">
          <span class="widths">安卓总充值金额：</span>
          <span class="orange">{{arr.allChargeAndroidCount}} </span>
          <span> 元</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script type="text/javascript">
import { home } from "@/api/home";

export default {
  name: "home",
  data() {
    return {
      head_show: true,
      arr: {},
      time:''
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      home(that).then(res=> {
        that.arr = res.data;
        that.time = that.$moment(new Date()).format('YYYY-MM-DD  HH:mm:ss')
      })
     
    },
    guanbi() {
      this.head_show = false;
    }
  }
};
</script>
<style type="text/css" scoped>
.body {
  padding: 20px;
  margin: 20px;
}

.tishi {
  text-align: center;
  border: 1px solid #51c41b;
  color: #51c41b;
  padding: 10px 0px;
  border-radius: 4px;
  margin-bottom: 20px;
  position: relative;
  background: #f6fff2;
}
.del {
  position: absolute;
  right: 20px;
  top: 13px;
}
.head_box {
  display: flex;
  justify-content: center;
}
.head_box_count {
  width: 20%;
  margin: 0px 40px;
  height: 100px;
  background: #fff;
  position: relative;
}
.qing {
  background: #37cfca;
}
.red {
  background: #fd4e4f;
}
.yellow {
  background: #ffc53d;
}
.blue {
  background: #42a7ff;
}
.head_box_left {
  display: inline-block;
  width: 88px;
  height: 100%;
  text-align: center;
  line-height: 130px;
}
.head_box_right {
  display: inline-block;
  margin-left: 20%;
  text-align: center;
  position: absolute;
  top: 6px;
  left: 26%;
}

.ban_card {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.box-card {
  width: 20%;
  margin: 0px 40px;
  height:196px;
}
.chongzhi {
  height: 290px;
}
.el-card__header {
  background: #EDEDED;
}
.item {
  height: 48px;
  line-height: 48px;
}
.orange {
  color: #FFC53D;
}
.widths {
  width: 80%;
  display: inline-block;
}
</style>
