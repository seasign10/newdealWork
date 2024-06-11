import {useState} from 'react';
export default function Controller({handleCount}){
    
    const onClickHandler=(value)=>{
        const val = value.target.innerText;
        handleCount(Number(val));
    };
    return (
        <div className="Controller">
            <button onClick={onClickHandler}>-1</button>
            <button onClick={onClickHandler}>-10</button>
            <button onClick={onClickHandler}>-100</button>
            <button onClick={onClickHandler}>+100</button>
            <button onClick={onClickHandler}>+10</button>
            <button onClick={onClickHandler}>+1</button>
        </div>
    )
}