export const SET_USERNAME = 'SET_USERNAME'
export const SET_UID = 'SET_UID'
export const SET_IP = 'SET_IP'

export const setUsername = userName => dispatch => {
    dispatch({
        type:SET_USERNAME,
        payload:userName
    })
};

export const setUid = id => dispatch =>{
    dispatch({
        type:SET_UID,
        payload:id
    })
}

export const setIp = ip => dispatch=>{
    dispatch({
        type:SET_IP,
        payload:ip
    })
}

