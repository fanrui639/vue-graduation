<template>
    <div style="text-align: center;">
        <el-upload
        class="upload-demo"
        drag
        action="/api/file/uploadFile"
        multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传重名文件将会被覆盖</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    
</style>
