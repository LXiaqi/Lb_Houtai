<template>
  <div>
    <div class="center_box">
      <div class="ipt_box">
        <span>一级标签：</span>
        <el-input class="ipts" placeholder="请输入标签名" v-model="editdlog.iconName" clearable></el-input>
      </div>
      <div class="ipt_box">
        <span>标签宽高：</span>
        <el-input class="ipts2" placeholder="宽度" v-model="editdlog.width" clearable type="number"></el-input>
        <el-input class="ipts2" placeholder="高度" v-model="editdlog.height" clearable type="number"></el-input>
      </div>
      <div class="ipt_box">
        <span>标签序号：</span>
        <el-input class="ipts3" placeholder="序号" v-model="editdlog.sort" clearable type="number"></el-input>
      </div>
      <p class="p">
        标签图片：
        <span style="color:red;">注：上传图片尺寸最好是所填尺寸的三倍图</span>
      </p>
      <div class="img_content">
        <div style="display:inline-block;">
          <p>未选中：</p>
          <el-upload
            class="avatar-uploader imgbox"
            :action="api+'/image/uploadImage'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editdlog.iconUrl" :src="editdlog.iconUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style=" display:inline-block;margin-left:180px">
          <p>选中：</p>
          <el-upload
            class="avatar-uploader imgbox"
            :action="api+'/image/uploadImage'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload2"
          >
            <img v-if="editdlog.iconUrlSelected" :src="editdlog.iconUrlSelected" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="center_box btn_box">
      <el-button type="primary" @click="submit_add">提交</el-button>
    </div>
  </div>
</template>

<script>
import { editLabel } from "@/api/user";
export default {
  name: "Editlabel",
  props: ["editdlog"],
  data() {
    return {
      label_edit: {},
      labelType: "0",
      api: "",
      sort: "",
      iconUrl: "",
      pid: "0",
      iconUrlSelected: "",
      img1: "",
      img2: "",
      onename: "", // 一级标签名
      width: "",
      height: ""
    };
  },
  created() {
    console.log(this.editdlog);

    this.api = window.API_ROOT;
  },
  methods: {
    submit_add() {
      const that = this;

      if (that.img1 == "") {
        that.img1 = that.editdlog.iconUrl;
      }
      if (that.img2 == "") {
        that.img2 = that.editdlog.iconUrlSelected;
      }

      that.label_edit = {
        gender: that.editdlog.gender,
        iconName: that.editdlog.iconName,
        width: that.editdlog.width,
        height: that.editdlog.height,
        id: that.editdlog.id,
        parentId: "0",
        sort: that.editdlog.sort,
        iconUrl: that.img1,
        iconUrlSelected: that.img2
      };
      editLabel(that).then(res => {
        that.$emit("dialogs", false);
      });
    },
    handleAvatarSuccess(res, file) {
      this.editdlog.iconUrl = URL.createObjectURL(file.raw);
      this.img1 = res.data;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    handleAvatarSuccess2(res, file) {
      this.editdlog.iconUrlSelected = URL.createObjectURL(file.raw);
      this.img2 = res.data;
    },
    beforeAvatarUpload2(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
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
.twoipt {
  width: 200px;
  margin-top: 12px;
  margin-left: 14px;
}
</style>