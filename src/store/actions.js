import axios from 'axios'

export default{
    initUser(context){
        // window.alert("初始化开始了")
        return new Promise((resolve,reject) => {
            axios.get('/api/user/init').then(response =>{
                context.commit('login',response.data.data)
                // this.$store.commit('login',response.data.data)
                resolve('初始化用户数据成功')
            }).catch(function (error) {
                console.log(error);
            });
        })
    },
    loadGoods(store) {
        axios.get('/api/user/init').then(function (response) {
            store.commit('login', response.data.data)
            //console.log(response);
        })
    },
}