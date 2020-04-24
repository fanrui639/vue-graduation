<template>
  <el-container style="height: 750px; border: 1px solid #eee">

    <!-- 侧边导航栏 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['0', '3']">

        <el-menu-item @click="changeComponent('0')"><i class="el-icon-folder"></i>查找文件</el-menu-item>

        <el-menu-item @click="changeComponent('1')"><i class="el-icon-folder"></i>文件管理</el-menu-item>

        <el-menu-item @click="changeComponent('2')"><i class="el-icon-folder-add"></i>文件上传</el-menu-item>

        <div v-if="this.$store.state.userInfo.userType == 1">
          <el-menu-item @click="changeComponent('3')"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
        </div>

      </el-menu>
    </el-aside>

    <!-- 默认的共享文件显示 -->
    <el-container v-if="boxNum == 0" >

      <el-header style="text-align: right; font-size: 12px">
        <el-input style="width:150px; padding：0 20 0 0"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchContext">
        </el-input>
           
        <el-button type="primary" icon="el-icon-search" @click="searchFile()">搜索</el-button>
      </el-header>

      <el-main>
        <el-table :data="shareFile"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >
          <el-table-column type="selection" width="55" prop="id" label="id">
          </el-table-column>

          <el-table-column prop="fileName" label="文件名" sortable width="180">
          </el-table-column>

          <el-table-column prop="size" label="文件大小">
          </el-table-column>

          <el-table-column prop="fileType" label="文件类型">
          </el-table-column>
          
          <el-table-column prop="createTime" label="上传日期" sortable width="180">
          </el-table-column>

          <el-table-column label="操作" class-name="code">
            <template slot-scope="scope">
              <el-button size="mini" @click="downShareFile(scope.row.class-name, scope.row.fileName, scope.row.id)">下载</el-button>           
            </template>
          </el-table-column>
          
        </el-table>
      </el-main>

      
      <el-pagination
        :page-size="6"
        @current-change="gotoSharePage"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      
    </el-container>
        
    <!-- 文件管理  @row-click="toLoad" -->
    <el-container v-if="boxNum == 1">
      <el-header>


      </el-header>

      <el-main>
        <el-table v-loading="loading" :data="myFile"   @row-dblclick="toLoad" 
        style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column type="selection" width="55" prop="id" label="id">
          </el-table-column>

          <el-table-column prop="fileName" label="文件名" sortable width="180">
          </el-table-column>

          <el-table-column prop="size" label="文件大小">
          </el-table-column>

          <el-table-column prop="fileType" label="文件类型">
          </el-table-column>
          
          <el-table-column prop="createTime" label="上传日期" sortable width="180">
          </el-table-column>

          <el-table-column label="操作" prop="fileProperty">
            <template slot-scope="scope">

              <div v-if="scope.row.fileProperty == 0" style="float:left">
                <el-button size="mini" @click="handleShareFile(scope.$index, scope.row.id)" type="primary">分享</el-button>
              </div>
              <div v-else style="float:left">
                <el-button size="mini" @click="handleUnShare(scope.$index, scope.row.id)" type="primary">取消分享</el-button>
              </div>

              <div style="float:left">&ensp; </div>

              <el-button slot="reference"  size="mini" type="success" @click="downloadFile(scope.row.fileName,scope.row.id)" >下载</el-button>
              
              <el-button size="mini" @click="handleDeleteFile(scope.$index,scope.row.id)" type="danger" slot="reference">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-main>

      <el-pagination
        :page-size="6"
        @current-change="gotoFilePage"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>

    </el-container>

    <!-- 文件上传 -->
    <el-container v-if="boxNum == 2" style="text-align:center">
    
      <myupload></myupload>
      
    </el-container>

    <!-- 用户管理 -->
    <el-container v-if="boxNum == 3">

      <el-header style="text-align: right; font-size: 12px">

        <el-badge :value="approval" :max="99" class="item" type="danger">
          <el-button size="small" @click="toApproval()">待审批</el-button>
        </el-badge>

      </el-header>

      <el-main>
      <el-table :data="myUser"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" @row-dblclick="showUser">
        <el-table-column type="selection" width="55" prop="id" label="id">
        </el-table-column>

        <el-table-column prop="username" label="用户名" sortable width="180">
        </el-table-column>

        <el-table-column prop="fileNum" label="文件数量">
        </el-table-column>

        <el-table-column prop="used" label="已用大小">
        </el-table-column>
        
        <el-table-column prop="createTime" label="日期" sortable width="180">
        </el-table-column>

        <el-table-column label="操作" prop="userType" >
        <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.id)">编辑</el-button>
            
            <el-button slot="reference"  size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)" >删除</el-button> -->
            <div v-if="scope.row.userType != 1">
             <el-button slot="reference" size="mini" type="success" @click="handleSet(scope.row.userType,scope.row.id)">设为管理员</el-button>
            </div>
            <div v-else-if="scope.row.userType == 1 && scope.row.id != 1">
              <el-button slot="reference" size="mini" type="success" @click="handleSet(scope.row.userType,scope.row.id)">取消管理员</el-button>
            </div>
        </template>
        </el-table-column>
      </el-table>
      </el-main>

      <el-pagination
        :page-size="6"
        @current-change="gotoUserPage"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </el-container>

    <!-- 显示用户管理的个人信息 -->
    <el-dialog :visible.sync="showUserInfo">
      
      <el-form :model="personInfo">
          <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="personInfo.username" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">   
              <el-input v-model="personInfo.phone" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="personInfo.email" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="personInfo.createTime" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="文件数量" :label-width="formLabelWidth">
              <el-input v-model="personInfo.fileNum" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="上次登录时间" :label-width="formLabelWidth">
              <el-input v-model="personInfo.loginTime" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="空间使用" :label-width="formLabelWidth" >
              <el-progress :text-inside="true" :stroke-width="20" :percentage="this.left" status="success"></el-progress>
          </el-form-item>
      </el-form>
          
      
    </el-dialog>

    <!-- 显示审批信息 -->
    <el-dialog title="审批列表" :visible.sync="myApproval">

      <approvalBox></approvalBox>

    </el-dialog>

  </el-container>
  
</template>


<script>
  import myleft from '../components/left.vue';
  import { mapGetters,mapState } from "vuex";
  import myupload from './upload.vue';
  import approvalBox from './approval.vue';
  import store from '../store';

  export default {
    components:{
      name:'main',
      myleft,myupload,approvalBox
    },
    computed:{
        ...mapState(['userInfo']),
    },
    data() {
      return {
        myUser:[],
        boxNum:0,
        myFile:[],
        shareFile:[],
        shareCode:'',
        downCode:'',
        searchContext:'',
        total:0,
        loading:false,
        personInfo:{},   //用户信息
        left:0,   //用户控件剩余量
        showUserInfo:false,  //用户信息的框
        formLabelWidth: '120px',
        approval:0,    //待审批数量
        myApproval:false,   //关闭审批框
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      changeComponent(name){
        this.boxNum = name
        if(name == 0){
          this.initShareFile();   //加载时获取分享的文件

        }
        if(name == 1){
          this.initMyFile();
      
        }
        if(name == 3){
          this.initMyUser();
          this.initApproval();
        }
      },

      initShareFile(page=0){
        this.$axios.get('/api/file/getShare',{params:{page:page}}).then(response =>{
          this.shareFile = response.data.data
          this.total = response.data.total
          // console.log(response.data.data.id)
          // store.commit('login',response.data.data)
        }).catch(function (error) {
            console.log(error);
        });
      },

      initMyFile(page=0){
        this.$axios.get('/api/file/getFileList',{
          params:{
            page:page
          }
        }).then(response =>{
          if(response.data.code == 500){
            this.$router.push("/login")
          }else{
            this.myFile = response.data.data
            this.total = response.data.total
          }
        }).catch(function (error) {
            console.log(error);
        });
      },

      initMyUser(page=0){
        this.$axios.get('/api/user/getAll',{params:{page:page}}).then(response =>{
          if(response.data.code == 500){
            this.$router.push("/login")
          }else{
            this.myUser = response.data.data
            this.total = response.data.total
          }
        }).catch(function (error) {
            console.log(error);
        });        
      },

      //删除文件
      handleDeleteFile(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.get('/api/file/deleteFile',{
            params:{
              id:row
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initMyFile();
          })          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });        
      },

      //分享文件
      handleShareFile(index,row){
        let that = this;
        const h = this.$createElement;
        this.$msgbox({
          title: '分享这个文件',
          message: h('p', null, [
            h('h5', null, '分享码 ： '),
            // h('input',null,that.shareCode)
            h("input", {
            style: {
              marginTop: "5px"
            },
            attrs: { value: that.shareCode, id:"hinput",maxlength:"4"},
            on: {
              input: this.handleClick
            }
          })
          ]),
          showCancelButton: true,
          confirmButtonText: '分享',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '分享中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 500);
              // done();

            } else {
              // alert("取消")
              done();
            }
          }
        }).then(action => {
          this.$axios.get('/api/file/shareFile',{
            params:{
              id:row,
              shareCode:this.shareCode
            }
          }).then(res =>{
            if(res.data.code == 0 ){
              this.shareCode='';
              this.$message({
                type: 'info',
                message: '分享成功！！！ '
              });
              console.log(this.shareCode)
              this.shareCode = ''
              this.initMyFile();
            }else if(res.data.code == 403){
              this.$message({
                type:"info",
                message:res.data.msg
              })
            }else{
              this.$message({
                type:"danger",
                message:"服务器繁忙，请稍后重试！"
              })
            }
          })
        });
      },
      handleClick(val) {
        var a = document.getElementById("hinput").value;
        this.shareCode = a
      },

      //取消分享
      handleUnShare(index,row){
        this.$axios.get('/api/file/unShare',{
            params:{
              id:row
            }
          }).then(res =>{
            // alert(res.data.code)
            if(res.data.code == 0 ){
              this.$message({
                type: 'info',
                message: '取消分享成功!!!'
              });
              this.initMyFile();
            }else{
              alert("没有成功")
            }
          })
      },

      //下载文件
      downloadFile(fileName,row){

        // this.$axios.get(`/api/file/downloadFile/${row}`,{responseType: 'blob'}).then(res =>{

        //   let blob = new Blob([res], {type: res.type})
        //   let downloadElement = document.createElement('a')
        //   // let href = window.URL.createObjectURL(blob); //创建下载的链接
        //   let href = '/api/file/downloadFile/' + row;

        //   downloadElement.href = href;
        //   downloadElement.download = fileName; //下载后文件名
        //   document.body.appendChild(downloadElement);
        //   downloadElement.click(); //点击下载
        //   document.body.removeChild(downloadElement); //下载完成移除元素
        //   window.URL.revokeObjectURL(href); //释放blob对象fileName

        // }).catch(function (error) {
        //     console.log(error);
        // });
        let downloadElement = document.createElement('a')
          // let href = window.URL.createObjectURL(blob); //创建下载的链接
          let href = '/api/file/downloadFile/' + row;

          downloadElement.href = href;
          downloadElement.download = fileName; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
      },

      //下载分享文件
      downShareFile(code,filename,row){

        if(code == 0){
          this.downloadFile(filename,row);
        }else{

          let that = this;
          const h = this.$createElement;
          this.$msgbox({
            title: '下载文件',
            message: h('p', null, [
              h('h5', null, '分享码 ：'),
              h("input", {
                style: {
                  marginTop: "20px"
                },
                attrs: { value: that.downCode, id:"downCode",maxlength:"4"},
                on: {
                  input: this.getDownCode
                }
              })
            ]),
            showCancelButton: true,
            confirmButtonText: '下载',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '下载中...';
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 500);
                // done();

              } else {
                // alert("取消")
                done();
              }
            }
          }).then(action => {
            if(this.downCode != ''){
              this.$axios.get('/api/file/downShareFile',{
                params:{
                  id:row,
                  code:this.downCode
                }
              }).then(res => {
                if(res.data.code == 0){
                  this.downloadFile(filename,row)
                  this.downCode=''
                }else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg,
                  });
                }
              })
            }else{
              this.$message({
                    type: 'error',
                    message: '请输入分享码',
                  });
            }
          });

        }

      },
      //获得填写的分享码
      getDownCode(val) {
        var a = document.getElementById("downCode").value;
        this.downCode = a
      },
      
      //设为管理员
      handleSet(type,row){
        var type = type == 1 ? 0 : 1;

        this.$axios.get('/api/user/setUser',{
          params:{
            id:row,
            type:type
          }
        }).then(res => {
          // alert("改变状态成功")
          this.initMyUser();
        })
      },

      //搜索共享文件
      searchFile(){
        if(this.searchContext == ''){
          this.initShareFile();
        }else{
          this.$axios.get('/api/file/getShareBySearch',{params:{searchContext:this.searchContext}}).then(response =>{
            this.shareFile = response.data.data
            this.total = 0
            // console.log(response.data.data.id)
            // store.commit('login',response.data.data)
          }).catch(function (error) {
              console.log(error);
          });
        }
      },

      //我的文件分页
      gotoFilePage(val){
        let page = (val - 1 ) * 6
        this.initMyFile(page);
      },

      //分享文件分页
      gotoSharePage(val){
        let page = (val - 1 ) * 6
        this.initShareFile(page);
      },

      //用户管理分页
      gotoUserPage(val){
        let page = (val - 1 ) * 6
        this.initShareFile(page);
      },

      //预览文件
      toLoad(row, event, column){
        // alert("我被双击了");       
        // console.log("文件id = " + row.id);
        this.loading = true;
        let that = this;
        this.$axios.get('/api/file/seeFile',{params:{id:row.id}}).then(response =>{
          if(response.status != 500 ){
            this.loading = false;
            // this.$alert(response.data, {
            //   dangerouslyUseHTMLString: true
            // });
            window.open("/api/file/seeFile?id=" + row.id);
          }else{
            this.loading = false;
            this.$message({
              type: 'info',
              message: '系统繁忙，请稍后再试! '
            });
          }
          
        }).catch(function (error) {
          
          that.loading = false;
          that.$message({
            type: 'info',
            message: '系统繁忙，请稍后再试! '
          }); 
        });
      },

      //管理用户信息
      showUser(row,event,column){
        // alert(row.id)
        // console.log(event)
        // console.log(column)
        this.$axios.get('/api/user/init',{params:{id:row.id}}).then(response =>{
          if(response.data.code == 0){
            this.showUserInfo = true;
            this.personInfo = response.data.data
            this.left = (response.data.data.used / (response.data.data.volume*1024))*100
            this.left = this.left.toFixed(2)
            // console.log(this.left)
            // console.log(response.data.data.used)
            // console.log(response.data.data.volume)
            this.drawer = true
          }else{
              this.$message({
                  type: 'info',
                  message: '系统繁忙，请稍后再试! '
              });
          }
        }).catch(function (error) {
            console.log(error);
        });
      },

      //审批
      toApproval(){
        this.myApproval = true
      },

      //初始化审批数量
      initApproval(){
        this.$axios.get('/api/approval/getNum').then(response =>{
          this.approval = response.data.data
        }).catch(function (error) {
            console.log(error);
        });
      }

    },
    mounted:function(){
      this.initShareFile();   //加载时获取分享的文件
      this.initMyFile();
      this.initMyUser();
      this.initApproval();
    },
    watch:{
      myApproval:function(){
        this.$store.commit('setApprovalStatus',this.myApproval)
      }
    }
  }
</script>



<style scoped>   
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
