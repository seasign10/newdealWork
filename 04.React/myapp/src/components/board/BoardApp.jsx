import React, { useState } from 'react';
import BoardNavi from './BoardNavi';
import BoardList from './BoardList';
import BoardForm from './BoardForm';

export default function BoardApp() {
  const [mode, setMode] = useState('list');

  // 전달된 값으로 모드 값 설정
  const onChangeMode = (value) => {
    setMode(value);
  }

  return (
    <div>
      <h1>Board App</h1>
      <BoardNavi onMode={onChangeMode} />
      {
        (mode==='list') && (<BoardList />)
      }
      {
        (mode==='write') && (<BoardForm onMode={onChangeMode} />)
      }
    </div>
  );
}
