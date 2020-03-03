import config from '../Components/config';
import axios from 'axios';
function login(data) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(`${config.apiUrl}/customer/Login`, requestOptions)
            .then(result => {
                return result.json()
            })
            .then(user => {
                if (user) {
                    return  resolve(user);
                }
            })
            .catch(err => {
                return   reject(err)
            });
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
function AddCategory(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiUrl}/AddCategory`,data).then(response=>{
            return resolve(response.data)
        }).catch((err)=>{

            return reject(err)
        })
    })
}
function getAllLazyCategory(data) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiUrl}/GetLazyCategoryData/${data.page}`).then(response=>{
            return resolve(response)
        }).catch((err)=>{
            return reject(err)
        })
    })

}
export const userService = {
    login,
    getAllCategory,
    AddCategory,
    getAllLazyCategory
};