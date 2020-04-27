<template>
    <div>        
        <el-container style="height: 750px; border: 1px solid #eee" >

            <el-header style="text-align: right; font-size: 12px">
                <el-input style="width:150px; padding：20"
                placeholder="请输入用户名"
                prefix-icon="el-icon-search"
                clearable
                v-model="searchUser">
                </el-input>

                <el-input style="width:150px; padding：20"
                placeholder="请输入操作事件"
                prefix-icon="el-icon-search"
                clearable
                v-model="searchEvent">
                </el-input>

                <el-input style="width:150px; padding：20"
                placeholder="请输入登录ip"
                prefix-icon="el-icon-search"
                clearable
                v-model="searchIp">
                </el-input>

                <el-input style="width:150px; padding：20"
                placeholder="开始时间"
                type="date"
                prefix-icon="el-icon-date"
                v-model="beginTime">
                </el-input>

                <el-input style="width:150px; padding：20"
                placeholder="结束时间"
                type="date"
                prefix-icon="el-icon-date"
                v-model="endTime">
                </el-input>
                
                <el-button type="primary" icon="el-icon-search" @click="searchButton()">搜索</el-button>
            </el-header>

            <el-main>
                <el-table :data="operatorList"  style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >

                    <el-table-column type="index" width="55" prop="id" >
                    </el-table-column>

                    <el-table-column prop="operator" label="操作人" sortable width="180">
                    </el-table-column>

                    <el-table-column prop="event" label="操作事件">
                    </el-table-column>

                    <el-table-column prop="operrationIp" label="操作地址">
                    </el-table-column>
                    
                    <el-table-column prop="time" label="操作时间" sortable width="180">
                    </el-table-column>

                    <el-table-column prop="type" label="操作类型" sortable width="180">
                    </el-table-column>
                
                </el-table>
            </el-main>

      
            <el-pagination
                :page-size="10"
                @current-change="gotoPage"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
      
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchUser:'',
            searchEvent:'',
            searchIp:'',
            beginTime:'',
            endTime:'',
            total:0,
            operatorList:[],
            flage:true,   //分页判断是否为搜索结果
        }
    },
    methods:{
        //初始化页面
        initPage(page=0){
            this.$axios.get('/api/operation/queryAll',{params:{page:page}}).then(response =>{
                this.operatorList = response.data.data
                this.total = response.data.total
            
            }).catch(function (error) {
                console.log(error);
            });
        },

        //搜索事件
        searchButton(page=0){
            if(this.searchUser != "" || this.searchEvent != "" || this.searchIp != "" || this.beginTime != "" || this.endTime != ""){
                
                this.flage = false

                this.$axios.get("/api/operation/search",{params:{
                    operator:this.searchUser,
                    event:this.searchEvent,
                    operrationIp:this.operrationIp,
                    beginTime:this.beginTime,
                    endTime:this.endTime,
                    page:page
                }}).then(res => {
                    this.operatorList = res.data.data
                    this.total = res.data.total
                }).catch(function (error){
                    console.log(error);
                })
            }else{
                this.flage = true
                this.initPage();
            }
            
        },

        //分页
        gotoPage(val){
            let page = (val - 1 ) * 10
            if(this.flage){
                this.initPage(page);
            }else{
                this.searchEvent(page);
            }
        },


    },
    mounted:function(){
        this.initPage();
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