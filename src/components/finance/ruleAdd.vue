<template>
  <div>
    <el-dialog class="dialogs" title="添加" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false" :show-close="false">
      <div>
        <el-radio v-model="radio" label="2">苹果充值</el-radio>
        <el-radio v-model="radio" label="1">安卓充值</el-radio>
      </div>
      <div class="center_box">
        <div class="ipt_box">
          <span>充值金额：</span>
          <el-input class="ipts" placeholder="请输入金额" v-model="money" clearable  type="number"></el-input> 
          <span>  元</span>
        </div>
         <div class="ipt_box">
          <span>对应撩币：</span>
          <el-input class="ipts" placeholder="请输入对应的撩币" v-model="liaoCoin" clearable  type="number"></el-input>
          <span>  撩币</span>
        </div>
      </div>
      <div class="center_box btn_box">
          <el-button type="primary" @click="submit_add">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRule } from "@/api/finance";
export default {
  name: "AddBox",
  props: ["rule_add"],
  data() {
    return {
      dialogVisible: false,
      radio: "2",
      money:'',
      liaoCoin:'',
      goodsType:'1'
    };
  },
  created() {
    this.dialogVisible = this.rule_add;
  },
  methods: {
      submit_add() {
        const that = this;
        addRule(that).then(res=> {
            that.dialogVisible = false;
            that.$emit("dialogs",that.dialogVisible);
        })
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