<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="btn__add">
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <!-- tab栏 -->
    <div class="header_top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="苹果充值" name="2"></el-tab-pane>
        <el-tab-pane label="安卓充值" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <div class="tab_box">
      <el-table :data="tableData" style="width: 38%" :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
        <el-table-column label="充值金额" >
            <template slot-scope="scope">
              <span style="color:red;">{{scope.row.price}}</span>元
            </template>
        </el-table-column>
        <el-table-column prop="liaoCoin" label="对应撩币" >
           <template slot-scope="scope">
              <span style="color:red;">{{scope.row.liaoCoin}}</span>撩币
            </template>
        </el-table-column>
        <el-table-column  label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框组件 -->
    <div>
      <AddBox v-if="logtype" :rule_add="logtype"  @dialogs="getdialog"></AddBox>
    </div>
    <div>
      <EditBox v-if="editType" :rule_edit="editType" :rule_edit2="tabData" @Editdialog="editLog"></EditBox>
    </div>
  </div>
</template>

<script>
import { rechargeRule,delRule } from "@/api/finance";
import AddBox from "@/components/finance/ruleAdd";
import EditBox from "@/components/finance/ruleEdit";

export default {
  components: {AddBox,EditBox},
  data() {
    return {
      activeName: "2",
      type: "1",
      tableData:[],
      logtype:false,
      editType:false,
      tabData:{},
      id:''
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      rechargeRule(that).then(res => {
        console.log(res);
        that.tableData = res.data
      });
    },
    // 切换
    handleClick() {
      console.log(this.activeName);
      this.info();
    },
    // 添加
    add() {
      this.logtype = true;
    },
    getdialog(event) {
      this.logtype = event;
      this.info();
    },
    del(id) {
       const that = this;
      that
        .$confirm("请确认是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.id = id;
          delRule(that).then(res => {
            that.info();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(data) {
      this.editType = true;
      this.tabData = data;
    },
    editLog(event) {
      console.log(event);
      this.editType = event;
      this.info();
    },
    // 表格数据居中
    thStyleFun() {
      return 'text-align:center';
    },
    cellStyleFun() {  
      return 'text-align:center';
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
</style>