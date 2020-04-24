<template>
    <div name="login">
        <login></login>
        <div>
            <h3>
                这里是另一个div的内容
            </h3>
            <slider></slider>
        </div>
        <div>
            <h4>这里测试head的内容</h4>
            <myhead></myhead>
        </div>
    </div>
</template>

<script>

import login from '../components/login.vue'
import slider from '../components/slider.vue'
import myhead from '../components/head.vue'

export default {
    components:{
        name:'login',
        login,slider,myhead
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


