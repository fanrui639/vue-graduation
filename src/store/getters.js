export default{
    memberInfo(state){
        switch(state.userStatus){
            case 1:
                return "VIP会员"
                break;
            case 2:
                return "管理员"
            default:
                return "普通用户"
                break;
        }
    }
}