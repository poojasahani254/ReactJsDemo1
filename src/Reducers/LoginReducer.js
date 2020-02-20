import {ISLOGIN} from '../Components/constFile';
import {INTIAL_STATE} from '../StateLoader.js';
const LoginReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ISLOGIN:
            return {
                UserData: action.payload,
            };
        default:
            return state;
    }
};
export default LoginReducer;