export default {
    login(state,v){
        state.userInfo = v
        state.toVip = true
    },
    loginOut(state){
        state.userInfo = ""
        state.toVip = false
        state.userType = ''
    },
    setApprovalStatus(state,v){
        state.approvalStatus = v
    }
}