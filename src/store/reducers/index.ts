import {combineReducers} from "redux";
import { TaskReduser } from "./TaskReduser";


export const rootReducer = combineReducers({
    tasks: TaskReduser
})

export type RootState = ReturnType<typeof rootReducer>