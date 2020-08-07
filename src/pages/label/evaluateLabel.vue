<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>评价标签</el-breadcrumb-item>
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
        style="width: 48%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column label="标签" >
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.name}}</span>
          </template>
        </el-table-column>
   
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delTwo(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加评价标签的模态框 -->
    <div>
        <el-dialog class="dialogs" title="添加" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :show-close="false">
            <addBox @dialogs="AddDialog"></addBox>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { evaluateLabel,Delevaluate, editEvaluate} from "@/api/user";
import addBox from "@/components/user/addevaluatel";
export default {
 components: { addBox },
  data() {
    return {
      activeName: "1",
      tableData: [],
      id: "",
      dialogVisible: false,
      label_data:{
          gender:'',
          id:'',
          name:''
      }
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      evaluateLabel(that).then(res => {
        console.log(res.data);
        that.tableData = res.data;
        console.log(that.tableData);
      });
    },
    // 切换
    handleClick() {
      this.info();
    },

    // add 添加
    add() {
        this.dialogVisible= true;
    },
    AddDialog(event) {
        this.dialogVisible= event;
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
          Delevaluate(that).then(res => {
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
        this.label_data.id = row.id;
        this.label_data.gender = row.gender;
        this.label_data.name = row.name;       
      const that = this;
         this.$prompt('修改标签', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:that.label_data.name
        }).then(({ value }) => {
            that.label_data.name = value;       
            editEvaluate(that).then(res=> {
              that.info();
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
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