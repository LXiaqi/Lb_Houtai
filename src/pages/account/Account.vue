<template>
  <div class="user_box">
    <!-- 面包屑 -->
    <el-breadcrumb style="margin-left：40px;line-height: 32px;">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>
  
    <div>
      <div class="user_search">
        <el-button class="search_btn" type="primary" @click="add_btn">添加</el-button>

      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="feedbackList" style="width: 100%;margin-top:40px">
      <el-table-column fixed label="编号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="adminName" label="账号"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
     
      <el-table-column label="操作">
         <template  >
             <el-button size="mini" type="danger" >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
   
    <el-dialog title="添加账号" :visible.sync="dialogVisible" width="30%">
        <div class="box_dialog">
            <span>账号：</span>
             <el-input style="width:80%" v-model="nickname" placeholder="请输入要添加的账号"></el-input>
        </div>
         <div class="box_dialog">
            <span>密码：</span>
             <el-input style="width:80%" v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div class="box_dialog">
            <span>姓名：</span>
             <el-input style="width:80%" v-model="realName" placeholder="请输入真实姓名"></el-input>
        </div>
           <el-button  type="primary" @click="add" >确认添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { addAccount,AccountList } from "@/api/login";

export default {
  
  data() {
    return {
      nickname: "",
      password:'',
      realName:'',
      feedbackList: [],
    dialogVisible:false

    };
  },
  created() {
    this.info();
  },
  methods:{
    info() {
      const that = this;
      AccountList(that).then(res=>{
        console.log(res);
         for(let i = 0; i < res.data.length; i++) {
         　　res.data[i].time = that.$moment(res.data[i].gmtCreate).format('YYYY-MM-DD  HH:mm:ss')
        }
        that.feedbackList = res.data;
    
      })
    },
    get_btn() {
      this.info();
    },

    add_btn() {
        this.dialogVisible = true;
    },
    add() {
        const that = this;
        addAccount(that).then(res=> {
            console.log(res);
            that.dialogVisible = false;
            that.info();
            that.nickname = '';
            that.password = '';
            that.realName = '';
        })
    }
  }
};
</script>

<style scoped>
.user_box {
  margin: 20px;
  padding: 20px;
  background: #fff;
}
.span {
  font-weight: bold;
}
.ipts {
  width: 220px;
}
.user_search {
  display: flex;
  justify-content: left;
  margin-left: 20px;
  margin-top: 30px;
}
.user_search > div {
  width: 22%;
  margin-left: 20px;
}
.search_btn {
  margin-left: 40px;
  width:120px;
}
.box_dialog {
    margin: 30px 20px;
}
</style>