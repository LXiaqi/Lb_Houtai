<template>
  <div class="rule_box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb style="margin-left：40px;line-height: 32px;">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>认证标签</el-breadcrumb-item>
      </el-breadcrumb>
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
        <el-table-column label="类目" width="200">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="liaoCoin" label="详情">
          <template slot-scope="scope">
            <el-tag
              v-for="res in scope.row.children"
              :key="res.id"
              closable
              type="warning"
              style="margin-left:10px;"
              @close="delTwo(res.id)"
            >{{res.iconName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="addTwo(scope.row.id)">添加</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { LabelList, DelLabel,AddLabel } from "@/api/user";

export default {
  data() {
    return {
      activeName: "1",
      labelType: "2",
      tableData: [
        {
          id: "1",
          name: "状态",
          children: []
        },
        {
          id: "2",
          name: "性格",
          children: []
        },
        {
          id: "3",
          name: "职业",
          children: []
        },
        {
          id: "4",
          name: "价值观",
          children: []
        },
        {
          id: "5",
          name: "生活方式",
          children: []
        },
        {
          id: "6",
          name: "爱好",
          children: []
        },
        {
          id: "7",
          name: "旅行",
          children: []
        },
        {
          id: "8",
          name: "游戏",
          children: []
        },
        {
          id: "9",
          name: "电影",
          children: []
        },
        {
          id: "10",
          name: "音乐",
          children: []
        },
        {
          id: "11",
          name: "运动",
          children: []
        }
      ],
      tabData: {},
      id: "",
      gender: '1',
      onename: "", // 一级标签名
      subLabelType:'',
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      const that = this;
      LabelList(that).then(res => {
        console.log(res.data);
        let list = res.data;
        for (let i = 0; i < that.tableData.length; i++) {
          that.tableData[i].children = list[i+1];
        }
        console.log(that.tableData);
      });
    },
    // 切换
    handleClick() {
      console.log(this.activeName);
      this.gender = this.activeName;
      this.info();
    },
    // 添加
    addTwo(id) {
        const that = this;
         this.$prompt('请输入要添加的标签详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            that.onename = value;
            that.subLabelType = id;
            AddLabel(that).then(res=> {
              that.info();
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
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
</style>