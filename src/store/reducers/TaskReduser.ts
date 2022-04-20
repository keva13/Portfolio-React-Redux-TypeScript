import {TaskAction, TaskActionTypes, TaskState} from "../../types/task"

const InitialState:TaskState = {
    tasks: [],
    loading: false,
    taskCount: 0,
    error: null
}

export const TaskReduser = (state = InitialState, action: TaskAction):TaskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {...state, loading: true, error: null, tasks: []}
        case TaskActionTypes.FETCH_TASKS_SUCCES:
            return {loading: false, error: null, taskCount: action.taskCount, tasks: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {...state, loading: false, error: action.payload, tasks: []}
        case TaskActionTypes.TASKS_UPDATE:
            return {...state, tasks: state.tasks.map(
                (current) => current.id === action.payload.id ? {...current, text: action.payload.text || current.text, status: action.payload.status || current.status} : current
            )}
        case TaskActionTypes.TASKS_CREATE:
            return {...state, tasks: [...state.tasks, action.payload]}
        default:
            return state

    }


}