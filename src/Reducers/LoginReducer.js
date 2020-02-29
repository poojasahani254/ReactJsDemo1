import {ISLOGIN,IS_CATRGORY} from '../Components/constFile';
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
        default:
            return state;
    }
};
export default LoginReducer;