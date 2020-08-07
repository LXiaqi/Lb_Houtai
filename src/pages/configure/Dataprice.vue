<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>APP配置</el-breadcrumb-item>
        <el-breadcrumb-item>用户配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- tab栏 -->
    <div class="header_top">
      <el-tabs v-model="key" @tab-click="handleClick">
        <el-tab-pane label="查看资料价格" name="viewUserInfoPrice"></el-tab-pane>
        <el-tab-pane label="可查看照片数" name="dayPhotoView"></el-tab-pane>
        <el-tab-pane label="注册有礼" name="freeLiaobi"></el-tab-pane>

      </el-tabs>
    </div>
    <div>
      <el-card class="box-card">
        <el-tag type="danger">{{appValue}}{{key=='viewUserInfoPrice' || key=='freeLiaobi' ? '撩币':'张'}}</el-tag>
        <el-button class="btn_edit" type="success" size="mini" @click="edit">修改</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAppSetting,updateAppSetting } from "@/api/configure";

export default {
  data() {
    return {
      key: "viewUserInfoPrice",
      appValue: "",
      val:'',
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      getAppSetting(that).then(res => {
        console.log(res);
        that.appValue = res.data.appValue;
      });
    },
    // 切换
    handleClick() {
      this.info();
    },
    edit() {
      const that = this;
      this.$prompt("", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: that.appValue,
      })
        .then(({ value }) => {
         that.val = value
          updateAppSetting(that).then(res=> {
              that.info();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    }
  }
};
</script>

<style scoped>
.rule_box {
  margin: 20px;
  padding: 20px;
  background: #fff;
  height: 800px;
}
.btn__add {
  float: right;
  margin-right: 30px;
}
.header_top {
  margin-top: 30px;
}
.tab_box {
  margin-top: 15px;
}
.box-card {
  width: 65%;
  height: 90px;
}
.btn_edit {
  margin-left: 40px;
}
</style>