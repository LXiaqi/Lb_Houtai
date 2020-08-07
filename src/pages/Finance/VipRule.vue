<template>
  <div class="rule_box">
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="btn__add">
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <div class="header_top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="苹果会员" name="2"></el-tab-pane>
        <el-tab-pane label="安卓会员" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="tab_box">
      <el-table
        :data="tableData"
        style="width: 82%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column label="会员名称">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员天数">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.subGoodsType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付撩币">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.liaoCoin}}</span>撩币
          </template>
        </el-table-column>
        <el-table-column label="对应金额">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.price}}</span>元
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框组件 -->
      <div>
           <el-dialog class="dialogs" title="添加"  :visible.sync="logtype" width="40%" >
               <AddBox  @dialogs="getdialog"></AddBox>
           </el-dialog>
      
      </div>
      <div>
            <el-dialog class="dialogs"  title="修改" :visible.sync="editType"  width="40%">
               <EditBox v-if="reFresh"  :rule_edit2="tabData" @Editdialog="editLog"></EditBox>
            </el-dialog>
       
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeRule, delRule } from "@/api/finance";
import AddBox from "@/components/finance/vipAdd";
import EditBox from "@/components/finance/vipEdit";

export default {
  components: { AddBox, EditBox },
  data() {
    return {
      reFresh:true, // 组件销毁和重建
      activeName: "2",
      type: "2",
      tableData: [],
      logtype: false,
      editType: false,
      tabData: {},
      id: "",
    };
  },
  // 组件的销毁和重建， 侦听器
  watch:{
    tabData() {
      this.reFresh = false
      this.$nextTick(()=> {
        this.reFresh = true;
      })
    }
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      rechargeRule(that).then((res) => {
        console.log(res);
        that.tableData = res.data;
      });
    },
    handleClick() {
      console.log(this.activeName);
      this.info();
    },
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
          type: "warning",
        })
        .then(() => {
          that.id = id;
          delRule(that).then((res) => {
            that.info();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(data) {
      this.editType = true;
      this.tabData = data;
      // console.log(this.tabData);
    },
    editLog(event) {
      this.editType = event;
      this.info();
    },
    // 表格数据居中
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
  },
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