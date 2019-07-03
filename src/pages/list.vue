<template>
  <div>
    <div class="header">
      <el-input v-model="search" placeholder="查询" class="search"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="handleAdd()">添加</el-button>
    </div>
    <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="100">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="156">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleDelete(scope.$index, tableData)" type="danger" size="small">删除</el-button>
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>


    <!--add-->
    <el-dialog title="添加" :visible.sync="dialogAdd">
      <el-form :model="formadd" @submit.native.prevent label-position="right" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="formadd.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formadd.region" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="formadd.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="formadd.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="formadd.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="formadd.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="formadd.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="formadd.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogAdd = false">确 定</el-button>
      </div>
    </el-dialog>


    <!--edit-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" @submit.native.prevent label-position="right" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--detele-->
    <el-dialog
      title=""
      :visible.sync="dialogDelete"
      width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogDelete = false">取 消</el-button>
    <el-button type="primary" @click="confirmDelete()">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "list",
    components: {

    },
    data () {
      return {
        search: '',
        dialogFormVisible: false,
        dialogDelete: false,
        dialogAdd: false,
        deleteindex: '',
        formadd: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tableData: [{
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '5',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '6',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '7',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333
        }, {
          id: '8',
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路',
          zip: 200333

        }],
        currentPage: 5,
      }
    },
    mounted: function () {

    },
    methods: {
      handleAdd: function() {
        this.dialogAdd = true;
      },
      handleEdit: function(row){
        this.dialogFormVisible = true;
        console.log(row.id);
        //console.log(row);
      },
      onSubmit: function() {
        console.log('submit!');
      },
      handleDelete: function(index, rows){
        this.dialogDelete = true;
        //rows.splice(index, 1);
        this.deleteindex = index;
      },
      confirmDelete: function (){
        this.tableData.splice(this.deleteindex, 1);
        this.dialogDelete = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

    },
  }
</script>

<style scoped lang="scss">

  .header {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #eef1f6;
    .search {
      margin-right: 10px;
      width: 160px;
    }
  }
  .el-table {
    margin-bottom: 10px;
  }
  .el-pagination {
     padding: 10px;
     background-color: #eef1f6;
   }

</style>

