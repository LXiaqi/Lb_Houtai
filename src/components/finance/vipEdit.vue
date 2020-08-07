<template>
  <div>
      <div>
        <el-radio v-model="radio" label="2">苹果会员</el-radio>
        <el-radio v-model="radio" label="1">安卓会员</el-radio>
      </div>
      <div class="center_box">
        <div class="ipt_box">
          <span>支付撩币：</span>
          <el-input
            class="ipts"
            placeholder="请输入支付的撩币"
            v-model="tebData.liaoCoin"
            clearable
            type="number"
          ></el-input>
          <span>撩币</span>
        </div>
                <div class="ipt_box">
          <span>等价金额：</span>
          <el-input
            class="ipts"
            placeholder="请输入等价的金额"
            v-model="tebData.price"
            clearable
            type="number"
          ></el-input>
          <span>元</span>
        </div>
        <div class="ipt_box">
          <span>会员名称：</span>
          <el-input class="ipts" placeholder="请输入对应的会员类型" v-model="tebData.title" clearable  ></el-input>
        </div>
        <div class="ipt_box">
          <span>会员天数：</span>
          <el-input class="ipts" placeholder="请输入对应的会员天数" v-model="tebData.subGoodsType" clearable type="number" ></el-input>
        </div>
        
      </div>
      <div class="center_box btn_box">
        <el-button type="primary" @click="submit_edit">提交</el-button>
      </div>
  </div>
</template>

<script>
import { editRule } from "@/api/finance";

export default {
  name: "EditBox",
  props: [ "rule_edit2"],
  data() {
    return {

      tebData: {},
      radio: "2",
      goodsType: "2",
    //   options:[
    //       {
    //           value:'1',
    //           label:'7天会员'
    //       }, {
    //           value:'2',
    //           label:'年会员'
    //       }, {
    //           value:'3',
    //           label:'终身会员'
    //       }
    //   ]
    };
  },
  created() {
    this.tebData = this.rule_edit2;
    console.log(this.rule_edit2);
    this.radio = this.tebData.platform.toString();
  },
  methods: {
    submit_edit() {
      const that = this;
      editRule(that).then(res => {
     
        that.$emit("Editdialog", false);
      });
    }
  }
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