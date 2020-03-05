import {userService} from '../Services/userServices';
import {ISLOGIN,IS_CATRGORY,GET_PAGINATIONDATA} from '../Components/constFile'

export const Login=(data)=>{
    return (dispatch)=>{
       return  userService.login(data).then((response)=>{
            dispatch({
                type: ISLOGIN,
                payload: response,
            });
            return  Promise.resolve(response)
        }).catch((err)=>{
            // alert('Something Wrong'+err)
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

export const getAllLazyCategory=(data)=>{
    debugger
    return (dispatch) =>{
        return userService.getAllLazyCategory(data).then((response)=>{
            debugger
            dispatch({
                type:GET_PAGINATIONDATA,
                payload: response.data
            })
            debugger
            return  Promise.resolve(response.data)
        }).catch((err)=>{
            console.log(err)
        })

    }
}
