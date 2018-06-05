
export const SAVEUSER = "counter/SAVEUSER";
export const SAVEACTID = "counter/SAVEACTID";

export function saveUser(User_data) {
    return {
        type: SAVEUSER,
        UserData:User_data,
    }
}

export function selectAct(Act_ID) {
    return {
        type: SAVEACTID,
        ActID:Act_ID,
    }
}
