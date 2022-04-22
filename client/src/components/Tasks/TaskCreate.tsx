import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { taskStatus } from '../../app.config';
import { useActions } from '../../hooks/useAtions';
import './TaskCreate.scss';


const TaskCreate: React.FC = () => {
    const { createTask } = useActions();
    const [modalVisible,setmodalVisible] = useState(false);
    const [disableSubmit,setDisableSubmit] = useState(false);
    const [newTask, setNewTask] = useState({
        username:"",
        email:"",
        text:"",
        status: 0
    })
    const history = useNavigate ();


    
    const createNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        setDisableSubmit(true)
        e.preventDefault();
        console.log("createNewTask")
        createTask(newTask).then((response:any)=>{
            setDisableSubmit(false)
            history('/task');
            setNewTask({
                username:"",
                email:"",
                text:"",
                status: 0
            });
            setmodalVisible(false)
        })
    }

    return (
        <div className='Task'>
            <button onClick={() => {setmodalVisible(true)}}>Create task</button>
            <div  onClick={(e) => {if(e.target == e.currentTarget) setmodalVisible(false)}} className={"modal" + (modalVisible ? " active" : "")}>
                <div className="modal-window">
                    <div className="modal-content">
                        <h3>Create Tast</h3>
                        <form action=""  onSubmit={createNewTask}>
                            <div>
                                <span>User name: </span><br/>
                                <input  
                                    name='name'
                                    onChange={(e)=>{setNewTask({...newTask, username: e.target.value})}}
                                    value={newTask.username} 
                                    required 
                                    type="text" />
                            </div>
                            <div>
                                <span>Email: </span><br/>
                                <input 
                                    name='email'
                                    pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                                    onChange={(e)=>{setNewTask({...newTask, email: e.target.value})}} 
                                    value={newTask.email} 
                                    required 
                                    type="text" />
                            </div>
                            <div>
                                <span>Status: </span><br/>
                                <select 
                                    onChange={(e) =>{setNewTask({...newTask, status: Number(e.target.value)})}} 
                                    value={newTask.status} 
                                    name="" 
                                    id="">
                                    {Object.entries(taskStatus).map((option)=>{
                                        return (
                                            <option key={option[0]} value={option[0]}>{option[1]}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='task_details-description'>
                                <span>Descrioption:</span><br/>
                                <textarea 
                                    onChange={(e) =>{setNewTask({...newTask, text: e.target.value})}}
                                    value={newTask.text} 
                                    required></textarea>
                            </div>
                            <button disabled={disableSubmit} type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCreate;