<template>
  <div class="user_box">
    <!-- 面包屑 -->
    <el-breadcrumb style="margin-left：40px;line-height: 32px;">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 顶部搜索 -->
    <div>
      <div class="user_search">
        <div>
          <span class="span">昵称：</span>
          <el-input class="ipts" v-model="nickname" placeholder="输入用户昵称"></el-input>
        </div>
        <div>
          <span class="span">手机：</span>
          <el-input class="ipts" v-model="phone" placeholder="输入手机号"></el-input>
        </div>
        <div>
          <span class="span">推荐：</span>
          <el-select v-model="recommend" placeholder="选择推荐" class="ipts">
            <el-option
              v-for="item in recommendList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="span">是否认证：</span>
          <el-select v-model="attestation" placeholder="选择是否认证" class="ipts">
            <el-option
              v-for="item in attestationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button class="search_btn" type="primary" icon="el-icon-search" @click="getbut">查询</el-button>
        <el-button class="search_btn" icon="el-icon-search" @click="chongzhi">重置</el-button>
      </div>
      <div class="user_search">
        <div>
          <span class="span">状态：</span>
          <el-select v-model="states" placeholder="账号状态" class="ipts">
            <el-option
              v-for="item in statesList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="userlist" style="width: 100%;margin-top:40px" :cell-style="cellstyle">
      <el-table-column fixed label="编号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              class="imgs"
              style="width: 100px; height: 100px;"
              :src="scope.row.userAvatar"
              :preview-src-list="[scope.row.userAvatar]"
            >
              <div slot="error" class="image-slot img_icon">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" class="names" width="140"></el-table-column>
      <el-table-column prop="gender" label="性别" width="100">
        <template slot-scope="scope">{{scope.row.gender == 1 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机" width="160"></el-table-column>
      <el-table-column prop="time" label="注册时间" width="160"></el-table-column>
      <el-table-column label="是否认证" prop="code" width="120"></el-table-column>
      <el-table-column prop="personalIntroduction" label="个人介绍" width="180"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span :class="scope.row.status==1 ? 'blue':'red'"></span>
          <span>{{scope.row.status==1 ? '正常':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.status==1"
            @click="prohibit(scope.row.id)"
          >禁用</el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            v-if="scope.row.status!=1"
            @click="Enable(scope.row.id)"
          ></el-button>
          <el-button size="mini" type="primary" @click="seeSee(scope.row.id)">查看</el-button>
          <el-button
            size="mini"
            type="info"
            v-if="scope.row.isRecommend==1"
            @click="quxiao(scope.row.id)"
          >已推荐</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-check"
            v-if="scope.row.isRecommend==0 && scope.row.certificationCode == 1"
            @click="recommends(scope.row.id)"
          >推荐</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="info"
    />

    <!-- 模态框 -->
    <el-dialog class="dialogs" title="用户资料" :visible.sync="dialogVisible" width="60%">
      <UserBox :user_details="ziLiao" @dialogs="getdialog"></UserBox>
    </el-dialog>
  </div>
</template>

<script>
import { userList, prohibit, recommended, seeUser } from "@/api/user";
import Pagination from "@/components/Pagination";
import UserBox from "@/components/user/user";
export default {
  components: {
    Pagination,
    UserBox
  },
  data() {
    return {
      userid: "",
      id: "", //用户id
      type: 0,
      type2: 0,
      userlist: [], // 列表数据
      nickname: "",
      phone: "",
      attestation: "", // 选中的认证状态
      attestationList: [
        {
          label: "已认证",
          value: 1
        },
        {
          label: "未认证",
          value: 0
        },
        {
          label: "未通过",
          value: 2
        }
      ],
      recommend: "", // 推选中的推荐状态
      recommendList: [
        {
          label: "已推荐",
          value: 1
        },
        {
          label: "未推荐",
          value: 0
        }
      ],
      states: "",
      statesList: [
        {
          label: "正常",
          value: 1
        },
        {
          label: "禁用",
          value: 0
        }
      ],
      total: 0, // 总数据量
      listQuery: {
        // 表格
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        bulletin: "", // 搜索的标题
        sort: "+id",
        searchStatus: false
      },
      dialogVisible: false, // 模态框显示隐藏
      ziLiao: {}
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      userList(that).then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].certificationCode == 1) {
            res.data.list[i].code = "已认证";
          } else if (res.data.list[i].certificationCode == 0) {
            res.data.list[i].code = "未认证";
          } else {
            res.data.list[i].code = "未通过";
          }
          res.data.list[i].time = that
            .$moment(res.data.list[i].gmtCreate)
            .format("YYYY-MM-DD  HH:mm:ss");
        }

        that.userlist = res.data.list;
        that.total = res.data.total;
        console.log(that.userlist);
      });
    },
    // 检索
    getbut() {
      this.info();
    },
    // 重置
    chongzhi() {
      this.nickname = "";
      this.phone = "";
      (this.attestation = ""),
        (this.recommend = ""),
        (this.states = ""),
        this.info();
    },
    // 禁用
    prohibit(id) {
      const that = this;
      that.id = id;
      that.type = 0;
      prohibit(that).then(res => {
        console.log(res);
        that.info();
      });
    },
    // 启用
    Enable(id) {
      const that = this;
      that.id = id;
      that.type = 1;
      prohibit(that).then(res => {
        console.log(res);
        that.info();
      });
    },
    // 推荐
    recommends(id) {
      const that = this;
      that.type2 = 1;
      that.id = id;
      recommended(that).then(res => {
        console.log(res);
        that.info();
      });
    },
    //取消推荐
    quxiao(id) {
      const that = this;
      that.type2 = 0;
      that.id = id;
      recommended(that).then(res => {
        console.log(res);
        that.info();
      });
    },
    // 查看
    seeSee(userid) {
      this.dialogVisible = true;
      const that = this;
      that.userid = userid;
      seeUser(that).then(res => {
        if (res.data.gender == 1) {
          res.data.gender_2 = "男";
        } else {
          res.data.gender_2 = "女";
        }

        that.ziLiao = res.data;
      });
    },
    getdialog() {
      this.dialogVisible = false;
      this.info();
    },
    cellstyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2) {
        return "color:#188FFC";
      }
    },
    
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
  width: 20%;
  margin-left: 20px;
}
.search_btn {
  margin-left: 20px;
}
.yong {
  color: red;
}

.demo-image__preview /deep/ .img_icon {
  text-align: center;
  line-height: 100px;
  color: #ccc;
}
.blue {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1890ff;
}
.red {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fd4d4f;
}

</style>