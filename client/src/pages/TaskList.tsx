import React, { useEffect, useState } from 'react';
import { useActions } from '../hooks/useAtions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { TaskRequestTypes_sort_field, TaskRequestTypes_sort_direction, TaskType } from '../types/task';
import Filters from '../components/Filters';
import Paginator from '../components/Paginator';
import TaskListItem from '../components/Tasks/TaskListItem';
import TaskCreate from '../components/Tasks/TaskCreate';

const TaskList: React.FC = () => {
    const { tasks, taskCount, error, loading } = useTypedSelector(state => state.tasks)
    const { fetchTasks } = useActions()
    let [page, setPage] = useState(1)
    let [sortDirection, setDirection] = useState(TaskRequestTypes_sort_direction.ASC)
    let [sortField, setField] = useState(TaskRequestTypes_sort_field.ID)

    const getTasks = () => {
        let options = {
            sort_field: sortField,
            sort_direction: sortDirection,
            page,
        }
        fetchTasks(options);
    }

    useEffect(() => {
        getTasks();
    }, [page, sortDirection, sortField])


    return (
        <div>
            <div className='spaseBetween'>
                <Filters 
                    field = {sortField} 
                    direction = {sortDirection} 
                    fieldCallback = {setField} 
                    directionCallback = {setDirection}/>
                <TaskCreate/>
            </div>
            {
                error?
                    <div className="error">{error}</div> 
                    :
                    loading ? 
                        <div className="loading"></div> 
                    :
                        tasks.map((task: TaskType) => {
                            return <TaskListItem key={task.id} task={task} />
                        })
                    
                    
            }
            <Paginator maxPage={taskCount} currentPage={page} SetPage={setPage} />
        </div>
    );
};

export default TaskList;