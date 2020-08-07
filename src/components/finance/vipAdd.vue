<template>
  <div>
 
      <div>
        <el-radio v-model="radio" label="2">苹果会员</el-radio>
        <el-radio v-model="radio" label="1">安卓会员</el-radio>
      </div>
      <div class="center_box">
        <div class="ipt_box">
          <span>支付撩币：</span>
          <el-input class="ipts" placeholder="请输入撩币" v-model="liaoCoin" clearable type="number"></el-input>
          <span>撩币</span>
        </div>
        <div class="ipt_box">
          <span>等价金额：</span>
          <el-input class="ipts" placeholder="请输入金额" v-model="money" clearable type="number"></el-input>
          <span>元</span>
        </div>
        <div class="ipt_box">
          <span>会员名称：</span>
          <el-input class="ipts" placeholder="请输入对应的会员类型" v-model="title" clearable></el-input>
            <span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</span>
        </div>
        <div class="ipt_box">
          <span>会员天数：</span>
          <el-input class="ipts" placeholder="请输入此类型的天数" v-model="subGoodsType" clearable type="number"></el-input>
          <span>天</span>

        </div>
      </div>
      <div class="center_box btn_box">
        <el-button type="primary" @click="submit_add">提交</el-button>
      </div>
   
  </div>
</template>

<script>
import { addRule } from "@/api/finance";
export default {
  name: "AddBox",
  props: [""],
  data() {
    return {
      radio: "2",
      money: "",
      title: "",
      goodsType: "2",
      subGoodsType:'',
      liaoCoin:''
    };
  },
  created() {
   
  },
  methods: {
    submit_add() {
      const that = this;
      addRule(that).then((res) => {
        that.$emit("dialogs", false);
        that.money = '';
        that.title = '';
        that.subGoodsType= '',
        that.liaoCoin = '';
      });
    },
  },
};
</script>

<style scoped>
.center_box {
  margin-top: 30px;
}
.ipts {
  width: 200px;
}
.ipt_box {
  display: inline-block;
  margin: 26px;
}
.btn_box {
  margin-left: 85%;
}
</style>