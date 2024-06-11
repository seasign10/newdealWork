import {useState} from 'react';

export default function Viewer({mycount}){
    return (
        <div className="Viewer">
            <h2>현재 카운트</h2>
            <div className="count">
                {mycount}
            </div>
        </div>
    )
}