<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color:#ADD8E6;"> <!-- @select="handleSelect" -->
            <el-menu-item index="1"><el-link type="primary" to="/">639网盘</el-link></el-menu-item>
            
            <!-- 登录后显示 -->
            <div v-if="userInfo.id != -1">
                <el-submenu index="2" style="float:right">
                        <template slot="title">{{userInfo.username}}</template>
                        <el-menu-item index="2-1" style="text-align:center" @click="getInfo()">个人主页</el-menu-item>
                        <el-menu-item index="2-2" style="text-align:center" @click="dialogFormVisible = true">修改个人信息</el-menu-item>
                        <el-menu-item index="2-3" style="text-align:center"><el-button type="info" @click="loginOut()" round="">退出登录</el-button></el-menu-item> 
                </el-submenu>
            </div>
            <!-- 没有登录的显示 -->
            <div v-else>
                <el-menu-item style="float:right">
                <el-submenu index="2-4">
                    <template slot="title">管理账号</template>
                    <el-menu-item index="2-4-1" style="text-align:center"><router-link target="_blank" to="/login">请登录</router-link></el-menu-item>
                    <el-menu-item index="2-4-2" style="text-align:center"><router-link to="/register">去注册</router-link></el-menu-item>
                </el-submenu>
                </el-menu-item>
            </div>
            <el-menu-item index="3" style="float:right" @click="Email()">联系客服</el-menu-item>    
            <el-menu-item index="4" style="float:right" @click="toVip()">会员中心</el-menu-item>        

            <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
            
        </el-menu>

        <!-- 用户修改信息的表单 -->
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="user" :rules="rules" ref="form">
                <el-form-item label="用户名" prop="username"  :label-width="formLabelWidth">
                    <el-input v-model="user.username" maxlength="10" ></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="user.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="user.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 显示个人信息的抽屉 -->
        <el-drawer title="个人信息" :visible.sync="drawer" direction="rtl" size="35%">
            <div class="demo-drawer__content">
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
                
            </div>
        </el-drawer>

        <!-- 联系客服的dialog -->
        <el-dialog title="联系客服" :visible.sync="connectKefu">
            <h5>请请选择类型</h5>
            <el-select v-model="title" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <br />
            <br />
            <h5>问题描述：</h5>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="kefuInfo">
            </el-input>
            <br />
            <br />
            <el-button  type="success" round @click="kefu()">提交</el-button>
        </el-dialog>

        <!-- 验证邮箱 -->
        <el-dialog title="验证邮箱" :visible.sync="verifyEmail">
            
        </el-dialog>

    </div>
</template>

<script>
import store from '../store';
import { mapGetters,mapState } from "vuex";
import axios from 'axios'

export default {
    data(){
        let app = this;
        return {
            user:{
                id:'',
                username: '',
                password: '',
                repassword:'',
                phone:'',
                email:'',
            },
            isRouterAlive: true,
            activeIndex: '1',
            activeIndex2: '1',
            dialogFormVisible : false,
            formLabelWidth: '120px',
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'},
                    {
                        validator: function (rule, value, callback) {

                            axios.get('/api/user/checkUsername',{
                                params:{
                                    username:value,
                                    id:app.user.id
                                }
                            }).then(res =>{
                                if(res.data.code == 500){
                                    callback(new Error(res.data.msg))
                                }else{
                                    callback();
                                }
                            })
                        }, trigger: 'blur'
                    }
                ],
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {
                        validator: function (rule, value, callback) {
                            var MobileRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
                            if (!MobileRegex.test(value)) {
                                callback(new Error('手机号码格式不正确！'))  // 这里错误的信息只要调用callback回调函数，然后在函数里newerror填写错误信息即可
                            } else {
                                axios.get('/api/user/checkPhone',{
                                params:{
                                    phone:value,
                                    id:app.user.id
                                }
                                }).then(res =>{
                                    if(res.data.code == 500){
                                        callback(new Error(res.data.msg))
                                    }else{
                                        callback();
                                    }
                                })
                                //callback();  // 一定要有，这是表单校验成功后的回调，会返回一个boolean值，即true
                            }
                        }, trigger: 'blur'
                    }
                ],
                email:[
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {
                        validator: function(rule, value, callback){
                            var EmailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                            if( !EmailRegex.test(value)){
                                callback(new Error('邮箱格式不正确!'))
                            }else{
                                callback();
                            }
                        }
                    }
                ]
            },
            drawer:false,
            personInfo:{},
            status:'success',
            left:0,
            connectKefu:false,
            title:'',
            msg:'',
            options: [{value: '用户发现错误',label: '报告错误'}, {value: '用户注销账号',label: '注销账号'}, {value: '用户报告其他错误',label: '其他问题'}],
            kefuInfo:'',
            verifyEmail:false,
        }
    },
    computed:{
        ...mapGetters(['memberInfo']),
        ...mapState(['userInfo'])
    },
    methods:{
        initUser(){
            //同步执行
            // // window.alert("初始化开始了")
            this.$axios.get('/api/user/init').then(response =>{
                this.user = response.data.data
                store.commit('login',response.data.data)
            }).catch(function (error) {
                console.log(error);
            });

            //异步执行
            // store.dispatch('initUser').then(res => {
            //     console.log(res)
            // })
        },
        loginOut(){
            this.$axios.get('/api/user/loginOut').then(response =>{
                // window.alert("退出成功");
                // this.reload()
                this.initUser();
                store.commit('loginOut')
                // window.reload()
                this.$router.push("/login")
            }).catch(function (error){
                console.log(error);
            })
        },
        reload(){
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        
        //编辑用户信息
        updateUser(){
            this.$refs['form'].validate( (valid,object) => { // 是否校验成功，和未成功的字段
                // console.log(valid);
                /*debugger*/
                if(valid){
                    //  表单中所有有验证的且已经通过的，就可以提交了
                    
                  var mydata = new FormData();
                  mydata.append('id',this.user.id)
                  mydata.append('username',this.user.username);
                  mydata.append('phone',this.user.phone);
                  mydata.append('email',this.user.email);
                  this.$axios.post('/api/user/updateUser',mydata).then(response =>{
                    if(response.success != false){
                        // console.log(response)
                        this.initUser();
                        this.dialogFormVisible = false;
                    }else{
                        console.log("this requst is failed")
                        this.$message({
                        showClose: true,
                        message:'服务出错,请稍后再试!!!',
                        type:'warning'
                        })
                  }
                })
                    
                }
               else {
                    this.$message({
                      showClose: true,
                      message:'请检查表格数据是否完整!!!',
                      type:'warning'
                    })
                    //return false; // 有任何一项没有通过验证表单就不能提交
                }
            });
        },

        //个人信息
        getInfo(){
            this.$axios.get('/api/user/init').then(response =>{
                if(response.data.code == 0){
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

        //联系客服
        kefu(){
            if(this.kefuInfo != "" && this.title != ""){
                this.$axios.get('/api/user/kefu',{params:{title:this.title,msg:this.kefuInfo}}).then(response =>{
                    if(response.data.code == 0){
                        this.connectKefu = false;                    
                    }else{
                        this.$message({
                            type: 'info',
                            message: '系统繁忙，请稍后再试! '
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }else{
                this.$message({
                    type: 'warning',
                    message: '不能上传空内容! '
                });
            }
        },

        //点击联系客服
        Email(){
            if(this.$store.state.userInfo.userType != -1){
                this.connectKefu = true;
            }else{
                this.$message({
                    type: 'warning',
                    message: '请先登录在操作! '
                });
                this.$router.push("/login")
            }
        },

        // 点击会员中心
        toVip(){
            if(this.$store.state.toVip){
                this.$axios.get('/api/alipay/getPagePay').then(response =>{
                    //返回参数 
                     let routerData = this.$router.resolve({path:'/VIP',query:{htmls:response.data.pay}})
                     let htmls = response.data.pay

                     //打开新页面
                     window.open(routerData.href,'_ blank')
                     const div = document.createElement('div');
                     div.innerHTML = htmls;
                     document.body.appendChild(div);
                     document.forms[0].submit();
                })
            }else{
                this.$router.push("/login")
            }
        }

    },
    mounted:function(){
        this.initUser();//需要触发的函数
    },
    


}
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>