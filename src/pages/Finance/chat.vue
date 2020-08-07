<template>
  <div class="rule_box">
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>聊天分成</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header_top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="聊天" name="chatPrice"></el-tab-pane>
        <el-tab-pane label="分成" name="chatGet"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="tab_box">
      <el-table
        :data="tableData"
        style="width: 38%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <!-- <el-table-column label="类型">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.title}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.appValue}}</span>
            <span>{{scope.row.appKey == 'chatPrice' ? '撩币' : '%'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框组件 -->
      <div>
           <!-- <EditBox v-if="editType" :rule_edit="editType" :rule_edit2="tabData" @Editdialog="editLog"></EditBox> -->
      </div>
    </div>
  </div>
</template>

<script>
import { chat,chatEdit,getPriceEdit } from "@/api/finance";


export default {

  data() {
    return {
      activeName: "chatPrice",
      type: "2",
      tableData: [],
      editType: false,
      tabData: {},
      id: "",
      price:''
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      chat(that).then(res => {
        console.log(res.data);
        that.tableData.push(res.data);
      });
    },
    handleClick() {
      console.log(this.activeName);
      this.tableData = [];
      this.info();
    },

    edit(data) {
        const that = this;
        this.$prompt('请输入金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^\d+$|^\d+[.]?\d+$/,
          inputErrorMessage: '格式不正确',
          inputValue:data.appValue
        }).then(({ value }) => {
            that.price = value;
            console.log(data.appKey);
            
            if(data.appKey == 'chatPrice') {
                 chatEdit(that).then(res=> {
                    that.tableData = []
                    that.info(); 
                })
            }
            if(data.appKey == 'chatGet') {
                getPriceEdit(that).then(res=> {
                    that.tableData = []
                    that.info(); 
                })
            }
           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
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