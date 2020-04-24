<template>
    <div name="index">
        <el-container>
            <el-header>
                <myhead></myhead>
            </el-header>
            <el-main>
                <mymain></mymain>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import myhead from '../components/head.vue'
import myleft from '../components/left.vue'
import mymain from '../components/main.vue'

export default {
    components:{
        name:'index',
        myhead,myleft,mymain
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


