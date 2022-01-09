import axios from "axios";
import { todoListModels } from 'Models/todolist-models';
import {MOCK_API_ENDPOINT }from '../constants/'

const doservicePostApi = (data: todoListModels) => {
    let url = `${MOCK_API_ENDPOINT}`;
    //console.log(data)
    return new Promise((resolve, reject) => {
        axios.post(`${url}`, data, {
            headers: {
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_ENGINE_URL}`,
            }
        })
            .then(res => {
                resolve(res.data);
            }).catch(reason => {
                reject(reason);
            })
    });
}

const doserviceGetApi = () => {
    let url = `${MOCK_API_ENDPOINT}`;
    //console.log(url)
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${url}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": `${process.env.REACT_APP_ENGINE_URL}`,
                        // 'Authorization' : token
                    },
                },
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

const getSummaryAmout = (data: todoListModels[]) => {
    var sum = 0
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        sum += element.amount
    }
    return sum
}

const apis = {
    doservicePostApi,
    doserviceGetApi,
    getSummaryAmout
}

export default apis