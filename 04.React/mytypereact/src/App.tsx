import React from 'react';
import './App.css';
import MyComp1 from './component/MyComp1';
import Greeting from './component/MyComp2';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <hr />
      <MyComp1 text='타입스크립트를 사용한 리액트' 
      href='http://www.naver.com'
      target='_blank'
      ></MyComp1>
      <MyComp1 text='Google' 
      href='http://www.google.com'
      />
      <Greeting name='Mr.TypeScript' color='blue'></Greeting>
      <Greeting name='Mr.React' color='green'></Greeting>
    </div>
  );
}

export default App;
