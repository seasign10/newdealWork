import React, {useState, useRef, useCallback} from 'react'
import { dummyData } from './data'
import TodoHeader from './TodoHeader'
import TodoFrom from './TodoForm'
import TodoList from './TodoList'

export default function TodoApp() {
  const [todos, setTodos] = useState(dummyData); // todos : 배열\
  const idRef = useRef(dummyData.length+1);
  // console.log(idRef.current);
  
  const onCreate=useCallback((content)=>{ // 여기서 useCallback을 캐싱하면 무한루프에 빠짐(데이터가 겹쳐쓰여짐)
    let newItem={
      ... todos,
      id: idRef.current,
      content: content,
      wdate: new Date().getTime(),
      isDone: false
    }
    // setTodos([...todos, newItem]);
    setTodos([newItem, ...todos]);
    // idRef.current 를 id값으로 활용 중
    idRef.current++; // 1씩 증가
  },[idRef.current, todos]) // idRef, todos를 의존성 배열에 추가해서 캐싱하지 않음

  const onDelete = useCallback((delId)=>{
    // filter 사용
    let tmpArr = todos.filter((todo) => (todo.id !== delId));
    setTodos(tmpArr);
  },[todos])

  const onChangeDone = (editId)=>{
    // alert(editId);
    let tmpArr = todos.map((todo)=>(
      // 삼항연산자
      // 사본을 만들어서 isDone값을 반대로 변경
      todo.id === editId ? {...todo, isDone: !todo.isDone} : todo
    )
  )
  setTodos(tmpArr)
}

  return (
    <div className='container text-center py-4'>
      <h1>Todo App</h1>
      <hr />
      <TodoHeader />
      <TodoFrom onCreate={onCreate} />
      <TodoList todos={todos} onDelete={onDelete} onChangeDone={onChangeDone} />
      {/* todos를 props로 TodoList에 전달  */}
    </div>
  )
}