<template>
   <div>
        您已经支付成功，{{time}}秒后跳转到网站首页
    </div>
</template>

<script>
export default {
    data(){
        return {
            apply:'',
            time:5,
        }
    },
    methods:{
        submitForm(action) {
            alert("准备提交付钱申请")
            var mydata = new FormData();
            mydata.append('outTradeNo',this.outTradeNo);
            mydata.append('subject',this.subject);
            mydata.append('totalAmount',this.totalAmount);
            mydata.append('body',this.body);
            this.$axios.post('/api/order/alipay',mydata).then(response =>{
                // if(response.success != false){
                //     // console.log(response)
                //     this.$router.push("./")
                // }else{
                //     this.$message({
                //     showClose: true,
                //     message:'服务出错,请稍后再试!!!',
                //     type:'warning'
                //     })
                // }
                console.log(response)
                console.log(response.data)
            })
        },
        timer(wait){
            let _this=this;
            let _wait = wait;
            if(wait == 0) {
                this.$store.state.toVIP = false
               this.$router.push("/")
            } else {
                wait--;
                _this.time = wait;
                setTimeout(function() {
                    _this.timer(wait);
                },1000);
            }
        },
        initPay(){
            
        }
    },
    mounted:function(){
        this.timer(this.time)
    }
}
</script>

<style scoped>
.form-container {
    padding-top:10px;
}
input {
    margin:10px;
    
}
</style>