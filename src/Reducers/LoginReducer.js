import {ISLOGIN,IS_CATRGORY,GET_PAGINATIONDATA} from '../Components/constFile';
import {INTIAL_STATE} from '../StateLoader.js';
const LoginReducer = (state = INTIAL_STATE, action) => {
    debugger
    switch (action.type) {
        case ISLOGIN:
            return {
                UserData: action.payload,
            };
        case IS_CATRGORY:
            return {
                CategoryData: action.payload,
            };
        case GET_PAGINATIONDATA:
            debugger
            return {
                Count:action.payload.count,
                GetPaginationData: [...state.GetPaginationData.concat(action.payload.data)],

            }
        default:
            return state;
    }
};
export default LoginReducer;