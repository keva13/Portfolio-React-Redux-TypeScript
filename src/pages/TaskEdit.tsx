import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskStatus } from '../app.config';
import { useActions } from '../hooks/useAtions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './TaskEdit.scss';


const TaskEdit: React.FC = () => {
    const { updateTasks } = useActions()
    let { id } = useParams();
    const { tasks } = useTypedSelector(state => state.tasks)
    const history = useNavigate ();
    const task = tasks.filter((task) => task.id.toString() == id)[0]
    const [status, setStatus] = useState(0);
    const [description, setDescription] = useState("");

    useEffect(()=>{
        if (!task) {
            history('/');
        } else {
            setStatus(task.status)
            setDescription(task.text)
        }
    },[])

    const submitEdit = () => {
        task.status = status;
        task.text = description;
        updateTasks(task).then(()=>{
            history('/');
        });
    }

    return !task? <div></div> : (
        <div className='Task'>
            <div><span>User name: </span>{task.username}</div>
            <div><span>Email: </span>{task.email}</div>
            <div>
                <span>Status: </span>
                <select onChange={(e) =>{setStatus(Number(e.target.value))}} value={task.status} name="" id="">
                    {Object.entries(taskStatus).map((option)=>{
                        return (
                            <option key={option[0]} value={option[0]}>{option[1]}</option>
                        )
                    })}
                </select>
            </div>
            <div className='task_details-description'><span>Descrioption:</span>
                <textarea onChange={(e) =>{setDescription(e.target.value)}} value={description} ></textarea>
            </div>
            <div><img src={task.image_path} alt="" /></div>
            <button className='submitButton' onClick={submitEdit}>Submit</button>
        </div>
    );
};

export default TaskEdit;