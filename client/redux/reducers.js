import { SET_USERNAME,SET_UID,SET_IP } from "./actions";

const initialState = {
        userName:'',id:'',ip:'192.168.1.40'
}

function userReducer (state = initialState,action) {
    switch(action.type){
        case SET_USERNAME:
            return {...state, userName:action.payload}
        case SET_UID:
            return {...state, id:action.payload}
        case SET_IP:
            return {...state,ip:action.payload}
        default:
            return state
    }
}

export default userReducer