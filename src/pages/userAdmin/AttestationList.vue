<template>
  <div class="user_box">
    <!-- 面包屑 -->
    <el-breadcrumb style="margin-left：40px;line-height: 32px;">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>认证审核</el-breadcrumb-item>
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

        <div>
          <span class="span">账号状态：</span>
          <el-select v-model="status" placeholder="账号状态" class="ipts">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <el-button class="search_btn" type="primary" icon="el-icon-search" @click="get_btn">查询</el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table :data="userlist" style="width: 100%;margin-top:40px" :cell-style="cellstyle">
      <el-table-column fixed label="编号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">{{scope.row.gender == 1 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column prop="wechat" label="微信号" width="160"></el-table-column>

      <el-table-column prop="phone" label="手机" width="160"></el-table-column>
      <el-table-column label="封面照" width="140">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.coverPhoto"
              :preview-src-list="[scope.row.coverPhoto]"
            >
              <div slot="error" class="image-slot img_icon">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="自拍照" width="140">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.selfPhoto"
              :preview-src-list="[scope.row.selfPhoto]"
            >
              <div slot="error" class="image-slot img_icon">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="认证时间" width="180"></el-table-column>

      <el-table-column label="用户标签" width="160">
        <template slot-scope="scope">
          <div
            v-bind="scope.row.chooseLabel == null ? scope.row.chooseLabel = {} : scope.row.chooseLabel"
          >
            <el-select
              @change="see_select(scope.row.chooseLabel.iconName)"
              v-model="scope.row.chooseLabel.iconName"
              size="mini"
              placeholder="请查看"
            >
              <el-option
                v-for="item in scope.row.labelList"
                :key="item.id"
                :label="item.iconName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" width="130">
        <template slot-scope="scope">
          <span :class="scope.row.status==1 ? 'blue':'red'"></span>
          {{scope.row.status==1 ? '正常':'禁用'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.certificationCode==0 || scope.row.certificationCode== 3"
            @click="tongGuo(scope.row.userId,scope.row.chooseLabel.id)"
          >通过</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.certificationCode==0 || scope.row.certificationCode== 3"
            @click="juJue(scope.row.userId)"
          >拒绝</el-button>
          <el-button size="mini" type="info" v-if="scope.row.certificationCode==1">已认证</el-button>
          <el-button size="mini" type="info" v-if="scope.row.certificationCode==2">已拒绝</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="set_biaoqian(scope.row.userId,scope.row.chooseLabel.id)"
          >标签更改</el-button>
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
import { AttestationList, Attestation, label } from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      labelId: "",
      userid: "",
      states: "",
      nickname: "", // 昵称
      phone: "", // 手机号
      status: "", // 选中的账户状态
      dates: "",
      statusList: [
        {
          label: "正常",
          value: 1
        },
        {
          label: "禁用",
          value: 0
        }
      ],
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
      bq: "", //选中标签
      bqlist: [], // 标签列表
      select_id:'',
    };
  },
  created() {
    this.info();
  },
  methods: {
    // 列表查询
    info() {
      const that = this;
      AttestationList(that).then(res => {
        console.log(res);
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].time = that
            .$moment(res.data.list[i].approveTime)
            .format("YYYY-MM-DD  HH:mm:ss");
        }
        that.userlist = res.data.list;
        that.total = res.data.total;
      });
    },
    // 检索按钮
    get_btn() {
      this.info();
    },
    // 通过，认证
    tongGuo(userid, bqid) {
      this.userid = userid;
      this.states = 1;
      if(this.select_id == '') {
          this.labelId = bqid;
      }else {
         this.labelId =this.select_id;
      }
      const that = this;
      if (this.labelId == undefined || this.labelId == '') {
        that.$message({
          message: "请选中标签后操作",
          type: "error"
        });
      } else {
        label(that).then(res => {
          Attestation(that).then(res => {
            that.info();
          });
        });
      }
    },
    // 选中标签
    see_select(id) {
      this.select_id = id;
      
    },
    // 拒绝认证
    juJue(userid) {
      this.userid = userid;
      this.states = 2;
      const that = this;
      Attestation(that).then(res => {
        that.info();
      });
    },
    // 更改用户标签
    set_biaoqian(userid, bqid) {
      if(this.select_id == '') {
          this.labelId = bqid;
      }else {
         this.labelId =this.select_id;
      }
    
      this.userid = userid;
    
      const that = this;
      if (this.labelId == undefined || this.labelId == '') {
        that.$message({
          message: "请选中标签后操作",
          type: "error"
        });
      } else {
        label(that).then(res => {
          that.info();
        });
      }
    },
    // 更改名字列的颜色
    cellstyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) {
        return "color:#188FFC";
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
  width: 20%;
  margin-left: 20px;
}
.search_btn {
  margin-left: 24%;
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