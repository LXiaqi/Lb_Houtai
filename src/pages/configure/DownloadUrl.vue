<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>APP配置</el-breadcrumb-item>
        <el-breadcrumb-item>下载配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- tab栏 -->
    <div class="header_top">
      <el-tabs v-model="key" @tab-click="handleClick">
        <el-tab-pane label="苹果" name="ios_download"></el-tab-pane>
        <el-tab-pane label="安卓" name="android_download"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-card class="box-card">
        <span>下载地址：</span>
        <el-tag type="danger">{{appValue}}</el-tag>
        <el-button class="btn_edit" type="success" size="mini" @click="edit">修改</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAppSetting,IosDownloadUrl,AndroidDownloadUrl } from "@/api/configure";

export default {
  data() {
    return {
      key: "ios_download",
      appValue: "",
      url:'',
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
      this.$prompt("下载地址", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: that.appValue,
      })
        .then(({ value }) => {
         that.url = value.replace(/&/, "%26")
          if(that.key == 'ios_download') {
              IosDownloadUrl(that).then(res=>{
                  that.info();
              })
          }else {
              AndroidDownloadUrl(that).then(res=> {
                  that.info();
              })
          }
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