<template>
  <div class="hello">
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
        <el-form-item label="联系电话:" prop="buyerPhone" required>
            <el-input v-model="ruleForm.buyerPhone"></el-input>
        </el-form-item>
        <el-form-item label="Email:" prop="buyerEmail" required>
            <el-input v-model="ruleForm.buyerEmail"></el-input>
        </el-form-item>
    </el-form> -->
    <span style="display: inline-block;width: 130px;height: 53px;border: 1px solid #D7D7D7;" @click="changeImgCode">
        <img :src="imgCode" style="width: 100%;height: 100%;cursor: pointer;"/>
    </span>
    <myupload></myupload>
  </div>
</template>

<script>
import myupload from './upload.vue'
export default {
  name: 'HelloWorld',
  components:{
      name:'HelloWorld',
      myupload
    },
  props: {
    msg: String
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换
  
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
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
      ruleForm: {
        buyerPhone: '',
        buyerEmail: ''
      },
      rules: {
        buyerPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        buyerEmail: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      imgCode:'/api/user/createImg',
    }
  },
  methods: {
    // 点击图片修改图片src
    changeImgCode() {
      var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
      this.imgCode = "/api/user/createImg?" + num;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
