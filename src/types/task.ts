
export interface TaskState {
    tasks: TaskType[],
    taskCount: number,
    loading: boolean,
    error: null | String
}

export interface TaskType {
    id: number,
    username: string,
    email: string,
    text: string,
    status: number,
    image_path?: string
}

export enum TaskRequestTypes_sort_field {
    ID = "id",
    USERNAME = "username",
    STATUS = "status",
    EMAIL = "email"
}

export enum TaskRequestTypes_sort_direction {
    ASC = "asc",
    DESC = "desc"
}

export interface FetchTasksRequest {
    developer?: string,
    sort_field: TaskRequestTypes_sort_field // "id" | "username" | "status" | "email",
    sort_direction: TaskRequestTypes_sort_direction //  'asc' | 'desc',
    page: number,
}

export interface UpdateTasksRequest {
    id: number,
    signature?: string
    status: number,
    text: string,
    token?: string,
    username?: string,
}

export enum TaskActionTypes {
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCES = "FETCH_TASKS_SUCCES",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
    TASKS_UPDATE = "TASKS_UPDATE",
    TASKS_CREATE = "TASKS_CREATE"
}

interface FetchTasksAction {
    type: TaskActionTypes.FETCH_TASKS
}
interface FetchTasksSuccesAction {
    type: TaskActionTypes.FETCH_TASKS_SUCCES
    payload: [];
    taskCount: number;
}
interface FetchTasksErrorAction {
    type: TaskActionTypes.FETCH_TASKS_ERROR
    payload: string;
}
interface FetchTasksUpdateAction {
    type: TaskActionTypes.TASKS_UPDATE
    payload: UpdateTasksRequest;
}
interface FetchTasksCreateAction {
    type: TaskActionTypes.TASKS_CREATE
    payload: TaskType;
}

export type TaskAction = FetchTasksAction | FetchTasksSuccesAction | FetchTasksErrorAction | FetchTasksUpdateAction | FetchTasksCreateAction;