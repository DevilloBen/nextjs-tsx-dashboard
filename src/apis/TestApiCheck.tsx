import axios from "axios";
import { DataTestApiObject } from 'Models/testapi-models';

const doserviceUpdateAppUser = (data: DataTestApiObject) => {
    let url = `${process.env.REACT_APP_ENGINE_URL}doservice`;
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                'Access-Control-Allow-Origin': `*`,
            }
        })
            .then(res => {
                resolve(res.data);
            }).catch(reason => {
                reject(reason);
            })
    });
}

const apis = {
    doserviceUpdateAppUser
}

export default apis