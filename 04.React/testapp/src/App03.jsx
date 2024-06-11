import React, {Component} from 'react';
import MyComp from './example/myComp';

export default class App extends Component{
    render(){
        return(
            <div>
                <h1>App03</h1>
                <hr />
                <MyComp mycolor="orange" bgcolor="red" myspace="1rem"></MyComp>
                <MyComp mycolor="green" bgcolor="blue" myspace="2rem" />
                <MyComp mycolor="blue" bgcolor="orange" myspace="3rem" />
            </div>
        )
    }
}