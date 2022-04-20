import React, {useEffect, useState} from 'react';
import './Paginator.scss';


const Paginator: React.FC<{
                            maxPage: number, 
                            currentPage:number, 
                            SetPage:Function
                        }> = ({maxPage,currentPage,SetPage}) => {


    function getMaxPageInArray() {
        let arr = [];
        for (let i = 1; i <= Math.ceil(maxPage/3); i++) {
            arr.push(i);
        }
        return arr;
    }

    

    return (
        <div className='paginator'>
            {getMaxPageInArray().map((page)=>{
                return (
                    <div
                    key={page}
                    onClick={()=> SetPage(page)} 
                    className={'paginator-page ' + (page === currentPage ? 'active' : '')}>
                        {page}
                    </div>
                )
            })}
        </div>
    );
};

export default Paginator;