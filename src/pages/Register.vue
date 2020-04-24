<template>
    <div style="padding:150px 200px 200px 200px;">
        <myRegister></myRegister>
        <!-- <helloworld></helloworld> -->
    </div>
</template>

<script>
import myRegister from '../components/register.vue';
import helloworld from '../components/HelloWorld.vue';

export default {
    components:{
        name:'register',
        myRegister,helloworld
    }
}
</script>