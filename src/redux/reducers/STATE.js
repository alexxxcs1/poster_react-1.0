import {SAVEUSER,SAVEACTID } from '../actions/STATE';
/*
* 初始化state
 */

const initState = {
    
    user_data:null,
    ActID:null,
    baseURL:'http://wechat.crnonline.org/'
};

function localUpdata(state)
{
        var locStore = JSON.parse(localStorage.getItem('persist:root'));
        
        locStore.webState = JSON.stringify(state);
        
    
        localStorage.removeItem("persist:root");
        localStorage.setItem('persist:root',JSON.stringify(locStore));
}
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {

        case SAVEUSER:
            state.user_data = action.UserData;
            localUpdata(state);
            return state;
        case SAVEACTID:
            state.ActID = action.ActID;
            localUpdata(state);
            return state;
        default:
            return state
    }
}