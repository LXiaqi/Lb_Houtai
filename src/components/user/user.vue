<template>
  <div>
    <div>
      <span class="span" id="photo_name">头像：</span>
      <el-upload
        class="avatar-uploader"
        :action="api+'/image/uploadImage'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="user_details.userAvatar" :src="user_details.userAvatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div>
      <span class="span">昵称：</span>
      <el-input style="width:40%" v-model="user_details.nickname" placeholder="请输入要修改的昵称"></el-input>
    </div>
    <div>
      <span class="span">手机号码：</span>
      <el-input style="width:40%" v-model="user_details.phone" placeholder="请输入要修改的手机号"></el-input>
    </div>
    <div>
      <span class="span">性别：</span>
      <el-select v-model="user_details.gender_2" placeholder="选择性别" class="ipts">
        <el-option
          v-for="item in genderList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div>
      <span class="span">身高：</span>
      <el-input style="width:40%" v-model="user_details.userHeight" placeholder="请输入要修改的身高"></el-input>
    </div>
    <div>
      <span class="span">学历：</span>
      <el-select v-model="user_details.education" placeholder="选择学历" class="ipts">
        <el-option v-for="item in XlList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div>
      <span class="span">职业：</span>
      <el-select v-model="user_details.career" placeholder="选择职业" class="ipts">
        <el-option v-for="item in ZyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="city">
      <span class="span">城市：</span>
      <!-- <el-select v-model="user_details.city" placeholder="选择城市" class="ipts">
        <el-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <el-cascader v-model="user_details.city" :options="cityList" :show-all-levels="false"></el-cascader>
    </div>
    <div>
      <span class="span" id="jieshao">个人介绍：</span>
      <el-input
        class="tarea"
        v-model="user_details.personalIntroduction"
        placeholder="简介"
        type="textarea"
      ></el-input>
    </div>
    <div>
      <span class="span">活动标签：</span>
      <el-tag
        class="tag"
        v-bind="user_details.label == null ? user_details.label = {} : user_details.label"
      >{{user_details.label.iconName}}</el-tag>
    </div>

    <div class="btn_box">
      <el-button type="primary" @click="submit_edit">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { region } from "../../assets/region";
import { edituser } from "@/api/user";

export default {
  name: "UserBox",
  props: ["user_details"],
  data() {
    return {
      ziLiao: {},
      genderList: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "0",
          label: "女"
        }
      ],
      XlList: [
        {
          value: "1",
          label: "大专"
        },
        {
          value: "2",
          label: "本科"
        },
        {
          value: "3",
          label: "硕士"
        },
        {
          value: "4",
          label: "博士"
        }
      ],
      ZyList: [
        {
          value: "1",
          label: "高管"
        },
        {
          value: "2",
          label: "创业者"
        },
        {
          value: "3",
          label: "董事长"
        },
        {
          value: "4",
          label: "金融"
        },
        {
          value: "5",
          label: "互联网"
        },
        {
          value: "6",
          label: "自由职业"
        },
        {
          value: "7",
          label: "财富自由"
        },
        {
          value: "8",
          label: "做点小生意"
        },
        {
          value: "9",
          label: "教师"
        },
        {
          value: "10",
          label: "医生"
        },
        {
          value: "11",
          label: "护士"
        },
        {
          value: "12",
          label: "银行"
        },
        {
          value: "13",
          label: "主播"
        },
        {
          value: "14",
          label: "网红"
        },
        {
          value: "15",
          label: "模特"
        }
      ],
      cityList: [],
      userData: {},
      dialogtype: false,
      imgUrl:'',
      api:'',
    };
  },
  created() {
    console.log(this.user_details);
    this.cityList = region;
    this.api = window.API_ROOT
  },
  methods: {
    submit_edit() {
      // 性别如果是汉字就让变成， 1 或者0
      if (this.user_details.gender_2 == "男") {
        this.user_details.gender_2 = "1";
      }
      if (this.user_details.gender_2 == "女") {
        this.user_details.gender_2 = "0";
      }
      // 城市， 如果是汉字字符串直接用， 如果是数组， 取数组的最后一项，
      if (Array.isArray(this.user_details.city)) {
        this.user_details.city = this.user_details.city[1];
      }
      
      this.userData = {
        id: this.user_details.id,
        nickname: this.user_details.nickname,
        phone: this.user_details.phone,
        gender: this.user_details.gender_2,
        city: this.user_details.city,
        userHeight: this.user_details.userHeight,
        education: this.user_details.education,
        career: this.user_details.career,
        personalIntroduction: this.user_details.personalIntroduction,
      };
      if(this.imgUrl != '') {
          this.userData.userAvatar = this.imgUrl
      }
      const that = this;
      edituser(that).then(res => {
        console.log(res);
        that.$emit("dialogs");
      });
    },

    // 头像
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data;
      this.user_details.userAvatar = URL.createObjectURL(file.raw);
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.dialogs div {
  margin: 14px;
}
.span {
  width: 80px;
  display: inline-block;
  text-align: right;
}
#photo_name {
  vertical-align: middle;
}
.ipts {
  width: 40%;
}
.tarea {
  display: inline-block;
  width: 40%;
  vertical-align: middle;
}
#jieshao {
  vertical-align: middle;
}
.tag {
  margin-left: 20px;
}
.city {
  position: relative;
}
.btn_box {
  text-align: center;
  margin-top: 30px;
}
/* 头像 */

.avatar-uploader {
  display:inline-block;
  vertical-align: middle;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-block;
}
</style>