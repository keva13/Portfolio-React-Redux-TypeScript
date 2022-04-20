import React from 'react';
import { sortField } from '../app.config';
import { TaskRequestTypes_sort_direction, TaskRequestTypes_sort_field } from '../types/task';
import './Filters.scss';


const Filters: React.FC<{
    field:TaskRequestTypes_sort_field, 
    direction: TaskRequestTypes_sort_direction,
    fieldCallback: Function,
    directionCallback: Function}> = ({field,direction,fieldCallback,directionCallback}) => {
    
    function getDirectionIcon(mapField:string) {
        if (mapField == field) {
            return direction == TaskRequestTypes_sort_direction.ASC ? "↑" : "↓"
        }
        return "↓";
    }
    
    function updateFilter(mapField:string) {
        if (mapField == field) {
            if (direction == TaskRequestTypes_sort_direction.ASC) 
                directionCallback(TaskRequestTypes_sort_direction.DESC)
            else 
                directionCallback(TaskRequestTypes_sort_direction.ASC)
        } else {
            directionCallback(TaskRequestTypes_sort_direction.DESC)
            fieldCallback(TaskRequestTypes_sort_field[mapField.toUpperCase() as keyof typeof TaskRequestTypes_sort_field])
        }
    }

    return (
        <div className='filters'>
            {sortField.map((mapField)=>{
                return (
                    <div 
                    key={mapField}
                        onClick={() => updateFilter(mapField)}
                        className={"field " + (mapField == field? "active" : "")
                    }>
                        {mapField} {getDirectionIcon(mapField) }
                    </div>
                )
            })}
        </div>
    );
};

export default React.memo(Filters);