<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动标签</el-breadcrumb-item>
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
        <el-table-column label="标签" width="200">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.iconName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="liaoCoin" label="详情">
          <template slot-scope="scope">
            <img class="imgs" :src="scope.row.iconUrl" alt />
            <img class="imgs" :src="scope.row.iconUrlSelected" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delTwo(scope.row.id)">删除</el-button>
            <el-button type="success" size="mini" @click="edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
          <el-dialog class="dialogs" title="修改" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false" :show-close="false">
            <editBox :label_edit="label_data" @dialogs="movedialogs"></editBox>
          </el-dialog>

          <el-dialog class="dialogs" title="添加" :visible.sync="addDialog" width="40%" :close-on-click-modal="false" :show-close="false">
            <addBox @dialogs_add="dialogs_adds"></addBox>
          </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { activityLabel, DelLabel, AddLabel } from "@/api/user";
import editBox from "@/components/user/editactivity";
import addBox from "@/components/user/addactivity";

export default {
   components: { editBox,addBox},
  data() {
    return {
      activeName: "1",
      labelType: "1",
      tableData: [],
      tabData: {},
      id: "",
      gender: "1",
      onename: "", // 一级标签名
      subLabelType: "",
      dialogVisible: false,
      label_data:{},
      addDialog:false,
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      activityLabel(that).then(res => {
        console.log(res.data);
        that.tableData = res.data;
        console.log(that.tableData);
      });
    },
    // 切换
    handleClick() {
      console.log(this.activeName);
      this.gender = this.activeName;
      this.info();
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

    // 修改
    edit(row) {
      this.label_data = row;
      this.dialogVisible = true;
    },
    movedialogs() {
      this.dialogVisible = false;
      this.info()
    },

    // 添加
    add() {
      this.addDialog = true;
    },
    dialogs_adds() {
      this.addDialog = false;
      this.info()
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
}
.btn__add {
  float: right;
  margin-right: 30px;
}
.header_top {
  margin-top: 20px;
}
.tab_box {
  margin-top: 15px;
}
.imgs {
  width: 120px;
  height: 36px;
  margin-left: 16px;
}
</style>