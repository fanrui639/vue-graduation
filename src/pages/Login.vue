<template>
    <div name="login" style="text-align:center;width:100%">
        <myhead></myhead>
        <div id="slider">
            <slider></slider>
        </div>
        <div id="loginBox" style="width: 500px;height: 500px;z-index: 999;margin-top: 150px;position: absolute;margin-left: 900px;">
            <login></login>
        </div>
        <div style="position:fixed;bottom:0;vertical-align: middle;display: table-cell;">
            <myfoot></myfoot>
        </div>
        <!-- <login></login> -->
    </div>
</template>

<script>

import login from '../components/login.vue'
import slider from '../components/slider.vue'
import myhead from '../components/head.vue'
import myfoot from '../components/foot.vue'

export default {
    components:{
        name:'login',
        login,slider,myhead,myfoot
    },
    data(){
        return {

        }
    },
    methods:{

    },
    watch:{
        
    }
}
</script>

<style scoped>
#slider{
    width: 99.2%;
    height: 75%;
    /* background-color: lawngreen; */
    position: absolute;
};
#loginBox{
    width: 500px;
    height: 500px;
    z-index: 999;
    /* background-color: red; */
    margin-top: 150px;
    position: absolute;
    margin-left: 900px;
}
</style>
