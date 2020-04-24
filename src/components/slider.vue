<template>
  <el-carousel indicator-position="outside" height="750px" width="100%">
    <el-carousel-item v-for="(item,index) in imgList" :key="index">
      <img v-bind:src=item.img />
    </el-carousel-item>
  </el-carousel>

  <!-- <el-carousel :interval="4000" type="card" height="750px">
    <el-carousel-item v-for="(item,index) in imgList" :key="index">
      <img v-bind:src=item.img />
    </el-carousel-item>
  </el-carousel> -->
</template>

<script>
export default {
    data(){
        return {
            imgList:[
                {'img':"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579149206456&di=a1bb024ffd5c5045337e3d63068af50d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F012de05948d384a8012193a372bba8.jpg%401280w_1l_2o_100sh.jpg"},
                {'img':"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579149289766&di=4342ec757da3270d7014ff8c6cbf820c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180821%2Fc12ebde917f5486db52d8df9a086781d.jpeg"},
                {'img':"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579149311878&di=78889894ff28ec7af73f42cc3bb81f9b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn22%2F93%2Fw1080h613%2F20180721%2Fa4f2-hfqtahi5094870.jpg"},
                {'img':"http://bigdata.swfu.edu.cn/wp-content/uploads/2018/11/QQ%E5%9B%BE%E7%89%8720181128154754-1200x480.jpg"},
            ]
        }
    }
}
</script>

<style>
   
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
</style>