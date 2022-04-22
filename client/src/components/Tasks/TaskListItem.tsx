import React from 'react';
import { taskStatus } from '../../app.config';
import { TaskType } from '../../types/task';
import './TaskListItem.scss';
import { useNavigate } from 'react-router-dom';


const TaskListItem: React.FC<{task: TaskType}> = (props) => {
    const history = useNavigate ();

    return (
        <div className='task_list-item' onClick={()=>{history("/task/"+props.task.id)}} >
            <h3>ID: {props.task.id}</h3>
            <div className="task_details">
                <div><span>User name: </span>{props.task.username}</div>
                <div><span>Email: </span>{props.task.email}</div>
                <div><span>Status: </span>{taskStatus[props.task.status as keyof typeof taskStatus]}</div>
                <div className='task_details-description'><span>Descrioption:</span><br/>{props.task.text}</div>
                <img src={props.task.image_path} alt="" />
            </div>
        </div>
    );
};

export default TaskListItem;