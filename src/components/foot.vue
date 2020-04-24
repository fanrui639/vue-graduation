<template>
    <div style="vertical-align: middle;display: table-cell;" target="_blank">
        <!-- <router-link :to="url">京ICP备案号:{{code}}</router-link> -->
        <a  target="_blank" :href="url" >
            <span class="a-inner"  >京ICP备案号:{{code}}</span>
        </a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            url:'http://www.beian.gov.cn',
            code:'53050202000118'
        }
    }
}
</script>