module.exports = {
    devServer:{
        port:8081,
        proxy:{
            '/api/':{
                target:'http://localhost:8889',
                // target:'http://175.24.88.103:8889',
                changeOrigin:true
            },
        }
    }
}