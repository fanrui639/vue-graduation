<template>
    <div>
        <h1>重置密码</h1>
        <div v-if="isShow">
            <span>用户名:</span><input v-model="username" @blur="checkname()"/>
            <br>
            <br>
            <span>手机号:</span><input v-model="phone" style="width:242px" /><el-button type="success" @click="verifyAccount()">发送验证码</el-button>
            <br>
            <br>    
            <span>验证码:</span><input v-model="verifyCode" />
            <br>
            <br>
            <el-button type="primary" round @click="toUpdate">重置密码</el-button>
        </div>
        <div v-if="!isShow">
            <span>新密码:</span><input v-model="password" />
            <br>
            <br>
            <span>确认新密码:</span><input v-model="repassword" />
            <br>
            <br>
            <el-button type="success" round @click="updatePassword()">确认修改</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return { 
            isShow:true,
            username:'',
            phone:'',
            verifyCode:'',
            password:'',
            repassword:'',
            status:false,
        }
    },
    methods:{
        //验证用户是否存在
        checkname(){
            console.log(this.username)
            if(this.username != ""){
                this.$axios.get('/api/user/checkUsername',{
                    params:{
                    username:this.username
                    }
                }).then(res =>{
                    if(res.data.code == 500){
                    this.status = true
                    }else{
                    this.$message({
                        showClose: true,
                        message:"用户名不存在，请检查您是否输入正确",
                        type:'warning'
                    })
                    this.username = ""
                    }
                })
            }
            
        },
        verifyAccount(){
            console.log(this.status)
            if(this.status == true && this.username != ""){
                let data = new FormData();
                data.append('username',this.username);
                data.append('phone',this.phone)
                this.$axios.post('api/user/verifyPhone',data).then(res => {
                    if(res.data.code != 500){
                        this.$message({
                            showClose: true,
                            message:res.data.msg,
                            type:'info'
                        })
                    }else{
                        this.$message({
                            showClose: true,
                            message:res.data.msg,
                            type:'warning'
                        })
                    }
                })
            }else{
               this.$message({
                    showClose: true,
                    message:"用户名不存在，请检查您是否输入正确",
                    type:'warning'
                }) 
            }
        },
        toUpdate(){
            let data = new FormData();
            data.append('verifyCode',this.verifyCode);
            this.$axios.post('/api/user/reVerifyCode',data).then(res => {
                if(res.data.code == 0){
                    this.isShow = !this.isShow
                }else{
                    this.$message({
                        showClose: true,
                        message:res.data.msg,
                        type:'warning'
                    })
                }
            })
        },
        updatePassword(){
            if(this.password != this.repassword){
                this.$message({
                    showClose: true,
                    message:"两次密码输入不一致！！！",
                    type:'warning'
                })
                this.password = ""
                this.repassword = ""
            }else if(this.status != true){
                this.$message({
                    showClose: true,
                    message:"用户名不存在，请检查您是否输入正确",
                    type:'warning'
                }) 
            }else{
                let data = new FormData();
                data.append('username',this.username);
                data.append('password',this.password)
                this.$axios.post('/api/user/updatePassword',data).then(res => {

                    this.$router.push('/login')
                })
            }
        }
    }
    
}
</script>

<style scoped>
input{
    width: 350px;
    height: 50px;
    border-radius: 20px;  
    vertical-align:middle;
    font-size:17px;
    outline:medium;
};
span{
    font-size: 20px;
};
</style>
