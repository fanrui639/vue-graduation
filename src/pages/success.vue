<template>
    <div>
        您已经支付成功，{{time}}秒后跳转到网站首页
    </div>
</template>

<script>
export default {
    data(){
        return{
            time:5,
        }
    },
    methods:{
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
            //这里是支付成功
        }
    },
    mounted:function(){
        this.timer(this.time)
    },
    props : {
       
    },

}
</script>