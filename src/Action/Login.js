import {userService} from '../Services/userServices';
import {ISLOGIN} from '../Components/constFile'

export const Login=(data)=>{
    return (dispatch)=>{
       return  userService.login(data).then((response)=>{
            dispatch({
                type: ISLOGIN,
                payload: response,
            });
            return  Promise.resolve(response)
        }).catch((err)=>{
            alert('Something Wrong'+err)
            // return new Promise.reject(err)
        })
    }
}