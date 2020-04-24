<template>

    <el-table :data="tableData" style="width: 100%">

        <el-table-column type="index" width="50" prop="id">
        </el-table-column>

        <el-table-column sortable prop="user" label="申请人">
        </el-table-column>

        <el-table-column sortable prop="event" label="内容">
        </el-table-column>

        <el-table-column sortable prop="time" label="时间">
        </el-table-column>

        <el-table-column prop="status" label="状态">
        </el-table-column>

        <el-table-column label="操作" prop="type">
            <template slot-scope="scope">

                <div v-if="scope.row.type == 1">
                    <el-button slot="reference" size="mini" type="warning" @click="deleteUser(scope.row.id,scope.row.user)">注销该用户</el-button>
                </div>

                <div v-else-if="scope.row.type == 2">
                    <el-button slot="reference" size="mini" type="success" @click="passShare(scope.row.id,scope.row.user,scope.row.event)">通过分享</el-button>
                </div>

                <el-button size="mini" type="info" @click="cencel(scope.row.id,scope.row.user)">驳回</el-button>

            </template>
        </el-table-column>
  </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: '',
            status:this.$store.state.approvalStatus
        }
    },
    methods: {
        initPage(){
            this.$axios.get('/api/approval/queryAll').then(response =>{

                // console.log(response.data.data)

                this.tableData = response.data.data
            }).catch(function (error) {
                console.log(error);
            });
        },

        //注销用户
        deleteUser(id,user){
            this.$axios.get('/api/approval/deleteUser',{params  :{id:id,user,user}}).then(response =>{

                this.$message({
                    type:'success',
                    message: '处理成功！'
                })

                this.initPage();
                
            }).catch(function (error) {
                console.log(error);
            });
        },

        //通过分享没有分享码的文件
        passShare(id,user,event){
            this.$axios.get('/api/approval/passFile',{params:{id:id,user:user,file:event}}).then(res =>{
                this.$message({
                        type:'success',
                        message: '处理成功！'
                    })

                    this.initPage();
                    
                }).catch(function (error) {
                    console.log(error);
            });
        },

        //驳回审批
        cencel(id,user){
            let myid = id
            //删除审批项
            this.$confirm('是否驳回该审批?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(() => {
                this.$axios.get('/api/approval/remove',{params:{
                    id:myid,
                    user:user
                }}).then(res => {

                    if(res.data.code == 500){
                        this.$message({
                            type: 'success',
                            message: res.data.data.meg
                        })
                    }else{
                        this.$message({
                            type: 'success',
                            message: '已驳回'
                        })
                        this.initPage();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消驳回'
                })
            })
        },

        //改变status的值
        setStatus(){
            // alert(this.$store.state.approvalStatus)
            this.status = this.$store.state.approvalStatus
        }
    },
    watch:{
        status:function(){
            // alert("来自approval" + this.status)
            if(this.$store.state.approvalStatus == true){
                this.initPage();
            }else{
                this.tableData = ''
            }
        }
    },
    mounted:function(){
        // alert("进入审批列表")
        this.initPage();
        // alert("来自approval" + this.$store.state.approvalStatus)
        // if(this.$store.state.approvalStatus == true){
        //     this.initPage();
        // }else{
        //     this.tableData = ''
        // }
        setInterval(this.setStatus,1000)
    }
}
</script>

<style scoped>
    
</style>
