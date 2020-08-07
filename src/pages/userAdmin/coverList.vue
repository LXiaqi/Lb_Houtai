<template>
  <div class="user_box">
    <!-- 面包屑 -->
    <el-breadcrumb style="margin-left：40px;line-height: 32px;">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>封面审核</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格展示 -->
    <el-table :data="userlist" style="width: 100%;margin-top:40px">
      <el-table-column fixed label="编号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" class="names"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120">
        <template slot-scope="scope">{{scope.row.gender == 1 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="wechatId" label="微信号"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column label="封面照">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              class="imgs"
              style="width: 100px; height: 100px;"
              :src="scope.row.newCoverPhoto"
              :preview-src-list="[scope.row.newCoverPhoto]"
            >
              <div slot="error" class="image-slot img_icon">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="yes(scope.row.id)">通过</el-button>
          <el-button size="mini" type="danger" @click="no(scope.row.id)">拒绝</el-button>
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
  </div>
</template>

<script>
import { coverPhotoList, verifyCoverPhoto } from "@/api/user";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      userlist: [], // 列表数据
      total: 0, // 总数据量
      listQuery: {
        // 表格
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        bulletin: "", // 搜索的标题
        sort: "+id",
        searchStatus: false
      },
      id: "",
      status: ""
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      coverPhotoList(that).then(res => {
        that.userlist = res.data;
      });
    },
    yes(id) {
      console.log(id);
      this.id = id;
      this.status = "1";
      const that = this;
      this.$confirm("请确认当前操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          verifyCoverPhoto(that).then(res => {
            that.info();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    no(id) {
      this.id = id;
      this.status = "2";
      const that = this;
      this.$confirm("请确认当前操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          verifyCoverPhoto(that).then(res => {
            that.info();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
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