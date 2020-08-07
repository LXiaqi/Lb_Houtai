<template>
  <div class="rule_box">
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>消费管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tab_box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" prop="userId"></el-table-column>
        <el-table-column prop="nickName" label="用户名称"></el-table-column>
        <el-table-column label="性别" width="100">
            <template slot-scope="scope">
                <span>{{scope.row.sex==1 ? '男':'女'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="phone" label="注册手机"></el-table-column>
        <el-table-column prop="time_c" label="消费时间"></el-table-column>
        <el-table-column  label="消费撩币">
              <template slot-scope="scope">
                <span>{{scope.row.totalAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="订单号"></el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            <span
              :class="scope.row.status==1 ? 'blue':'red'"
            >{{scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
            <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="info"
      />
    </div>
  </div>
</template>

<script>
import { rechargeList } from "@/api/finance";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      userId:'',
      type: "4",
      tableData: [],
        total: 0, // 总数据量
      listQuery: {
        // 表格
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        bulletin: "", // 搜索的标题
        sort: "+id",
        searchStatus: false
      }
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      rechargeList(that).then(res => {
        console.log(res);
         for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].time_c = that
            .$moment(res.data.list[i].time)
            .format("YYYY-MM-DD  HH:mm:ss");
        
        }
        that.tableData = res.data.list;
        that.total = res.data.total;
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
  /* height: 800px; */
}
.tab_box {
  margin: 20px;
}

.blue {
  color: #1890ff;
}
.red {
  color: #fd4d4f;
}
</style>