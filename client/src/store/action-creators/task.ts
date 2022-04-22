import axios from "axios";
import { Dispatch } from "react";
import AppConfig from "../../app.config";
import  md5 from 'crypto-js/md5';
import { TaskActionTypes, TaskAction, FetchTasksRequest, UpdateTasksRequest, TaskType } from "../../types/task"
import toast from 'react-hot-toast';


export const fetchTasks = (data:FetchTasksRequest) =>{
    return async (dispatch:Dispatch<TaskAction>) => {
        try {
            dispatch({type: TaskActionTypes.FETCH_TASKS})
            data.developer = AppConfig.developer;
            const response = await axios.get(AppConfig.apiUrl, {params: data});
            if (response.data.status !== "error") 
                dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCES, payload: response.data.message.tasks, taskCount: response.data.message.total_task_count})
            else
                dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: response.data.message})
        } catch (error) {
            dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: "FetchError"})
        }
    }
}

export const updateTasks: any = (data:UpdateTasksRequest) =>{
    return async (dispatch:Dispatch<TaskAction>): Promise<any> => {
        try {
            data.token = "beejee"
            let queryParam = "status="+encodeURIComponent(data.status.toString())+
                            "&text="+encodeURIComponent(data.text)+
                            "&token="+encodeURIComponent(data.token)
            data.signature = md5(queryParam).toString();

            var form_data = new FormData();
            form_data.append("signature", data.signature);
            form_data.append("status", data.status?.toString() || "0");
            form_data.append("text", data.text || "");
            form_data.append("token", data.token);

             
            return axios.post(AppConfig.apiUrl + "/edit/" + data.id + "/?developer=" + AppConfig.developer,form_data).then((response)=>{
                if (response.data.status !== "error") {
                    toast.success('Success',{position: "bottom-right"});
                    dispatch({type: TaskActionTypes.TASKS_UPDATE, payload: data})
                }
                else{
                    toast.error(response.data.message,{position: "bottom-right"});
                }
            });

        } catch (error) {
            return Promise.reject();
        }
    }
}

export const createTask: any = (data:TaskType) =>{
    return async (dispatch:Dispatch<TaskAction>): Promise<any> => {
        try {
            var form_data = new FormData();

            Object.entries(data).map((q)=>{
                form_data.append(q[0], q[1]);
                return encodeURIComponent(q[0]) + "=" + encodeURIComponent(q[1])
            })
             
            return axios.post(AppConfig.apiUrl + "create/?developer=" + AppConfig.developer,form_data).then((response)=>{
                if (response.data.status !== "error") {
                    toast.success('Success',{position: "bottom-right"});
                    //dispatch({type: TaskActionTypes.TASKS_CREATE, payload: data})
                }
                else{
                    toast.error(response.data.message,{position: "bottom-right"});
                }
            });

        } catch (error) {
            return Promise.reject();
        }
    }
}