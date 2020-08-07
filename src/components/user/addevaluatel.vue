<template>
  <div>

      <div>
        <el-radio v-model="gender" label="1">男</el-radio>
        <el-radio v-model="gender" label="0">女</el-radio>
      </div>
      <div class="center_box">
        <div class="ipt_box">
          <span>标签名字：</span>
          <el-input class="ipts" placeholder="请输入标签名" v-model="name" clearable></el-input>
        </div>
      </div>
      <div class="center_box btn_box">
        <el-button type="primary" @click="submit_add">提交</el-button>
      </div>

  </div>
</template>

<script>
import { Addevaluate } from "@/api/user";
export default {
  name: "AddBox",
  props: [""],
  data() {
    return {
      gender: "1",
      name: "", // 一级标签名
    };
  },
  created() {
   
  },
  methods: {
    submit_add() {
      const that = this;
      if (that.name == "") {
        that.$message({
          message: "标签名不能为空呦！",
          type: "warning"
        });
        return;
      }
      Addevaluate(that).then(res => {
        that.$emit("dialogs", false);
        that.name = '';
      });
    },

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
.ipts2 {
  width: 120px;
  margin-left: 16px;
}
.ipts3 {
  width: 140px;
}
.ipt_box {
  display: inline-block;
  margin: 16px;
}
.btn_box {
  margin-left: 85%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 98px;
  height: 98px;
  line-height: 98px;
  text-align: center;
}
.avatar {
  width: 98px;
  height: 98px;
  display: block;
}
.img_content {
  margin-left: 90px;
}
.imgbox {
  display: inline-block;
  border: 1px solid #ccc;
}
.p {
  margin-left: 16px;
}
</style>