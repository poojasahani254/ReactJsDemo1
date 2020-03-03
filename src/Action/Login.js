import {userService} from '../Services/userServices';
import {ISLOGIN,IS_CATRGORY} from '../Components/constFile'

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

export const AddCategory=(data)=>{
    return (dispatch) =>{
        return userService.AddCategory(data).then((response)=>{
            dispatch({
                type:IS_CATRGORY,
                payload: response
            })
            return  Promise.resolve(response)
        }).catch((err)=>{
            console.log(err)
        })

    }
}