<template>
  <div style="">
    <h4>注 册</h4>
    <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="用 户 名" prop="username" required>
            <el-input v-model="form.username" maxlength="10"  style="width:550px;" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="密    码" prop="password" required>
            <el-input v-model="form.password" show-password style="width:550px;" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" required>
            <el-input v-model="form.repassword" show-password style="width:550px;" clearable></el-input>
        </el-form-item>
        <el-form-item label="手    机" prop="phone" required>
            <el-input v-model="form.phone" style="width:410px;" clearable></el-input>
            <el-button style="float:right" @click="sendMsg()" type="success" round>发送手机验证码</el-button>
        </el-form-item>
        <el-form-item label="验 证 码" prop="verifyCode"  required>
            <el-input v-model="form.verifyCode"  style="width:550px;" maxlength="4" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮    箱" prop="email" required>
            <el-input v-model="form.email" clearable style="width:550px;"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      let app = this
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      }
      return {
        form: {
          username: '',
          password: '',
          repassword:'',
          phone:'',
          email:'',
          verifyCode:''
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // resource: '',
          // desc: ''
        },
        rules: {
          // phone: [
          //   { validator: checkPhone, trigger: 'blur' }
          // ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          password:[
                {
                    validator:function (rule,value,callback) {
                        if(value === ''){
                                callback(new Error("请输入密码"));
                        }else{
                            callback();
                        }
                    }
                }
            ],
            repassword:[
                {
                    validator:function (rule,value,callback) {
                        if(value === ''){
                            callback(new Error("请输入密码"));
                        }else{
                            if(value !== app.form.password){
                                callback(new Error('两次密码输入不一致'));
                            }else{
                                callback();
                            }
                        }
                    }
                }
            ],
            username: [
                {required: true, message: '请输入用户名', trigger: 'blur'},
                {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'},
                  {
                    validator: function (rule, value, callback) {
                      axios.get('/api/user/checkUsername',{
                        params:{
                          username:value
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
                            callback();  // 一定要有，这是表单校验成功后的回调，会返回一个boolean值，即true
                        }
                    }, trigger: 'blur'
                }
            ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate( (valid,object) => { // 是否校验成功，和未成功的字段
                console.log(valid);
                /*debugger*/
                if(valid){
                    //  表单中所有有验证的且已经通过的，就可以提交了
                    
                  var mydata = new FormData();
                  mydata.append('username',this.form.username);
                  mydata.append('password',this.form.password);
                  mydata.append('phone',this.form.phone);
                  mydata.append('verifyCode',this.form.verifyCode);
                  mydata.append('email',this.form.email);
                  this.$axios.post('/api/user/register',mydata).then(response =>{
                  if(response.success != false){
                    console.log(response)
                    this.$router.push("./")
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
        // console.log(this.form)
        // if(this.form.username == "" || this.form.password == "" || this.form.repassword == "" || this.form.phone == "" || this.form.email == "" || this.form.verifyCode == ""){
        //   this.$message({
        //     message: '请把表格数据填写完整',
        //     type: 'warning'
        //   });
        // }else{
        //   console.log(this.form);
        //   var mydata = new FormData();
        //   mydata.append('username',this.form.username);
        //   mydata.append('password',this.form.password);
        //   mydata.append('phone',this.form.phone);
        //   mydata.append('verifyCode',this.form.verifyCode);
        //   mydata.append('email',this.form.email);
        //   console.log(mydata)
        //   if(this.form.password == this.form.repassword){
        //     this.$axios.post('/api/user/register',mydata).then(response =>{
        //       if(response.success != false){
        //         console.log(response)
        //         this.$router.push("./")
        //       }else{
        //         console.log("this requst is failed")
        //         this.$message({
        //           showClose: true,
        //           message:'服务出错,请稍后再试!!!',
        //           type:'warning'
        //         })
        //       }
        //     })
        //   }else{
        //     this.$message({
        //       showClose: true,
        //       message: '两次密码输入不一致',
        //       type: 'warning'
        //     })
        //     this.$router.push("./register")
        //   } 
        // }
      },
      sendMsg(){
        
        this.$axios.get('/api/user/sendMsg',{
            params:{            
                phone:this.form.phone   //参数，键值对，key值：value值
            }
        }).then(res => {
            if(res.data.code == 0){
              this.$message({
                showClose: true,
                message: '已经发送验正码',
                type: 'success'
              })
            }else if(res.code != 0){
              this.$message({
                showClose: true,
                message: "验正码发送失败",
                type: 'warning'
              })
            }
        });
        
      }
    }
  }
</script>

<style scoped>
  
</style>