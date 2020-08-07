<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户标签</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="btn__add">
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <!-- tab栏 -->
    <div class="header_top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="男" name="1"></el-tab-pane>
        <el-tab-pane label="女" name="0"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <div class="tab_box">
      <el-table
        :data="tableData"
        style="width: 68%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column label="一级" width="200">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.iconName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="liaoCoin" label="二级">
          <template slot-scope="scope">
            <!-- <span v-for="res in scope.row.children" :key="res.id" style="color:red;margin-left:10px;">{{res.iconName}}、</span> -->
            <el-tag
              v-for="res in scope.row.children"
              :key="res.id"
              closable
              type="warning"
              style="margin-left:10px;"
              @close="delTwo(res.id)"
              @click="editTwo(res)"
            >{{res.iconName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addTwo(scope.row)">添加</el-button>
            <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框组件 -->
    <div>
      <el-dialog
        class="dialogs"
        title="添加"
        :visible.sync="dialogVisible"
        width="40%"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <AddBox @dialogs="getdialog"></AddBox>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        class="dialogs"
        title="编辑"
        :visible.sync="editdialog"
        width="40%"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <Editlabel :editdlog="edit_row" @dialogs="edit_dialogs"></Editlabel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { LabelList, DelLabel, AddLabelTwo,editLabel } from "@/api/user";
import AddBox from "@/components/user/addlabel";
import Editlabel from "@/components/user/Editlabel";

export default {
  components: { AddBox, Editlabel },
  data() {
    return {
      activeName: "1",
      labelType: "0",
      tableData: [],
      tabData: {},
      id: "",
      pid: "",
      val: "",
      gender: "",
      dialogVisible: false,
      edit_row: {},
      editdialog: false,
      label_edit:{},
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      LabelList(that).then(res => {
        console.log(res.data[0]);
        let list = res.data[0];
        for (let i = 0; i < list.length; i++) {
          if (list[i].parentId == 0) {
            that.tableData.push(list[i]);
          }
        }
        for (let j = 0; j < that.tableData.length; j++) {
          that.tableData[j].children = [];
          for (let a = 0; a < list.length; a++) {
            if (that.tableData[j].id == list[a].parentId) {
              that.tableData[j].children.push(list[a]);
            }
          }
        }
        console.log(that.tableData);
      });
    },
    // 切换
    handleClick() {
      console.log(this.activeName);
      this.tableData = [];
      this.info();
    },
    // 添加
    add() {
      this.dialogVisible = true;
    },
    // 添加二级
    addTwo(obj) {
      console.log(obj);
      const that = this;
      this.$prompt("添加二级标签", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          that.val = value;
          that.pid = obj.id;
          that.gender = obj.gender;
          AddLabelTwo(that).then(res => {
            console.log(res);
            that.tableData = [];
            that.info();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    // 编辑操作
    edit(row) {
      this.edit_row = row;
      this.editdialog = true;
    },
    edit_dialogs(event) {
      this.editdialog = event;
      this.tableData = [];
      this.info();
    },
    // 编辑二级
    editTwo(row) {
      console.log(row);
      const that = this;
      this.$prompt("编辑二级标签", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue:row.iconName
      })
        .then(({ value }) => {
         that.label_edit = {
           iconName:value,
           id:row.id,
           labelType:row.labelType,
           parentId:row.parentId,
           gender:row.gender,
         }
         editLabel(that).then(res => {
            that.tableData = [];
            that.info();
         })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    // 添加模态框关闭
    getdialog(event) {
      this.dialogVisible = event;
      this.tableData = [];
      this.info();
    },
    // 删除一级标签
    del(id) {
      const that = this;
      that
        .$confirm("该操作会删除该类型下的所有子类", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.id = id;
          DelLabel(that).then(res => {
            this.tableData = [];
            this.info();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 删除二级标签
    delTwo(id) {
      const that = this;
      that
        .$confirm("请确认是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.id = id;
          DelLabel(that).then(res => {
            this.tableData = [];
            this.info();
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 表格数据居中
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
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