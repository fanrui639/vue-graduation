<template>

    <!-- <div style="text-align:center; width:400px; height:600px;backgroud-color:red">
        <table style=" text-align:center;vertical-align:middle; border=1">
            <head><h2>登录个人网盘</h2></head>
            <tr>
                <td>用户名：</td>
                <td><input v-model="username" placeholder="请输入用户名" /></td>
            </tr>
            <tr>
                <td>密码：</td>
                <td><input v-model="password" type="password" placeholder="请输入密码" /></td>
            </tr>
            <tr>
                <td>验证码</td>
                <td><input v-model="verifyCode" placeholder="请输入验证码" maxlength="4" /></td>
                <span @click="changeImgCode">
                    <el-image style="width: 150px; height: 50px" :src="imageUrl"></el-image>
                </span>
            </tr>
            <tr>
                <router-link to="/register">没有账号？去注册</router-link>
            </tr>
            <tr>
                <router-link to="/repsw">忘记密码？</router-link>
            </tr>
            <tr>
                <el-button @click="login()" type="success">登录</el-button>
            </tr>
        </table>
    </div> -->


    <div style="width: 500px;height: 500px" >
        <el-card shadow="hover" style="padding: 20px;width: 100%;height: 500px;text-align: center;opacity:0.9;">
            <h2>登 录 个 人 网 盘</h2>
            <br />
            <br />
            <div style="text-algin:center">
                <span>用户名：</span><input v-model="username" placeholder="请输入用户名" />
                <br />
                <br />
                <span>密    码：</span><input v-model="password" placeholder="请输入密码" type="password" />
                <br />
                <br />
                <div>
                    <span>验证码：</span><input v-model="verifyCode" placeholder="请输入验证码" maxlength="4" style="width:200px"/>
                    <span @click="changeImgCode">
                        <el-image style="width: 150px; height: 50px;vertical-align:middle;" :src="imageUrl"></el-image>
                    </span>
                </div>
            </div>
            <br />
            <br />
            <router-link to="/repsw" style="font-size:20px;margin-right:190px">忘记密码？</router-link>
            <router-link to="/register" style="font-size:20px;">没有账号？去注册</router-link>
            <br />
            <br />
            <el-button type="primary" round style="heigth:50px" @click="login()">登录个人网盘</el-button>
        </el-card>
    </div>
</template>

<script>
import store from '../store'
import slide from './slider'

export default {
    data(){
        return {
            username:'',
            password:'',
            verifyCode:'',
            imageUrl:'/api/user/createImg'
        }
    },
    created(){
        this.keyupSubmit();
    },
    methods:{
        login(){

            if(this.username != '' && this.password != '' && this.verifyCode != ''){
                // window.alert(this.username,this.password)
                var mydata = new FormData();
                mydata.append('username',this.username);
                mydata.append('password',this.password);
                mydata.append('verifyCode',this.verifyCode);
                // this.$axios.post('/api/user/login',{
                //     username:this.username,
                //     password:this.password
                // }).then(response => {
                //     this.msg = response.data
                // }).catch(function (error) {
                //     console.log(error);
                // });
                this.$axios.post('/api/user/login',mydata).then(response => {
                    if(response.data.code==0){
                        // this.msg = response
                        this.$store.commit('login',response.data.data)
                        this.$router.push("/")
                    }else{
                        // this.msg = response
                        // store.commit('login',response.data)
                        // this.$router.push("./")
                        this.$message({
                            showClose: true,
                            message:response.data.msg,
                            type:'warning'
                        })
                        this.changeImgCode()
                        this.verifyCode = ''
                    }
                    
                }).catch(function (error) {
                    console.log(error);
                });
            }else{
                this.$message({
                        showClose: true,
                        message:"请填写登录信息",
                        type:'warning'
                    })
            }
        },

        keyupSubmit(){
            document.onkeyup = e =>{
                let _key = window.event.keyCode;
                if(_key === 13){
                    this.login();
                }
            }
        },

        // 点击图片修改图片src
        changeImgCode() {
            var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
            this.imageUrl = "/api/user/createImg?" + num;
        },
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
input::-webkit-input-placeholder {
    /* placeholder颜色  */
    /* color: #aab2bd; */
    /* placeholder字体大小  */
    font-size: 250px;
    color: #383838;
};
span{
    font-size: 20px;
};
router-link{
    font-size: 20px;
}
</style>
