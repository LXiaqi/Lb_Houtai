<template>
  <div class="user_box">
    <!-- 面包屑 -->
    <el-breadcrumb style="margin-left：40px;line-height: 32px;">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>账号注销申请</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 顶部搜索 -->
    <div>
      <div class="user_search">
        <div>
          <span class="span">昵称：</span>
          <el-input class="ipts" v-model="nickname" placeholder="输入用户昵称"></el-input>
        </div>
        <div>
          <span class="span">手机号：</span>
          <el-input class="ipts" v-model="phone" placeholder="输入手机号"></el-input>
        </div>

        <el-button class="search_btn" type="primary" icon="el-icon-search" @click="get_btn">查询</el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="feedbackList" style="width: 100%;margin-top:40px" :cell-style="cellstyle">
      <el-table-column fixed label="编号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="time" label="反馈时间"></el-table-column>
      <el-table-column prop="content" label="吐槽反馈"></el-table-column>
      <el-table-column prop="link" label="联系方式"></el-table-column>
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
import { logoutList } from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
   components: {
    Pagination
  },
  data() {
    return {
      nickname: "",
      phone: "",
      feedbackList: [],
      total: 0, // 总数据量
      listQuery: {
        // 表格
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        bulletin: "", // 搜索的标题
        sort: "+id",
        searchStatus: false
      },
    };
  },
  created() {
    this.info();
  },
  methods:{
    info(){
      const that = this;
      logoutList(that).then(res=> {
        console.log(res);
         for(let i = 0; i < res.data.list.length; i++) {
         　　res.data.list[i].time = that.$moment(res.data.list[i].gmtCreate).format('YYYY-MM-DD  HH:mm:ss')
        };
        that.feedbackList = res.data.list;
        that.total = res.data.total;
      })
    },
    get_btn() {
      this.info();
    },
    cellstyle({ row, column, rowIndex, columnIndex }) {
      if(columnIndex ==1) {
        return 'color:#188FFC'
      }
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
  margin-left: 40%;
}
</style>