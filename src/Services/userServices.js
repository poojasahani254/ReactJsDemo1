import config from '../Components/config';
import axios from 'axios';
function login(data) {
    return new Promise((resolve, reject) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };
            fetch(`http://localhost:3000/customer/Login`, requestOptions)
                .then(result => {
                    return result.json()
                })
                .then(user => {
                    if (user) {
                        return resolve(user);
                    }
                })
                .catch(err => {
                    alert('Something went wrong. Try again'+err);
                });
        } catch (err) {
            alert('Something went wrong. Try again'+err);
        }
    })
}

function getAllCategory() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiUrl}/GetAllCategory`).then(response=>{
            return resolve(response.data)
        }).catch((err)=>{
                return reject(err)
        })
    })

}
export const userService = {
    login,
    getAllCategory
};