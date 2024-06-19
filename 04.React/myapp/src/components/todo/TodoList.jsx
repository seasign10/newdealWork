import React, {useMemo, useState} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import TodoListItem from './TodoListItem';
// import './TodoList.css';

export default function TodoList({todos, onDelete, onChangeDone}) {

  const [search, setSearch] = useState(''); // 검색어를 저장할 상태
  const onFind=(e)=>{
    setSearch(e.target.value); // 검색어 설정
  }

  const getSearchResult = ()=>{
    if(!search){
      return todos; // 검색어가 없으면 전체 목록 반환
    } else {
      // 문자열 검색 : 문자열.indexOf(검색어) > number(인덱스) or -1(검색어 없음
      // 배열, 문자열 : 문자열.includes(검색어) > true or false
      // return todos.filter((todo)=>(todo.content.indexOf(search) !== -1));

      // 대소문자 구분 없이 검색 : toLowerCase()를 이용해서 검색할, 검색하는 문자들을 소문자로 변경
      return todos.filter((todo)=>(todo.content.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    }
  }

  // useMemo()를 이용해서 완료된 일과 해야할 일의 개수를 계산
  const aggregate = useMemo(()=>{
    const totalCnt = todos.length; // 총 할 일
    const doneCnt = todos.filter((todo)=>(todo.isDone)).length; // 완료된 개수
    const notDoneCnt = totalCnt - doneCnt; // 해야할 일의 개수
    return [totalCnt, doneCnt, notDoneCnt];
  }, [todos])

  const [totalCnt, doneCnt, notDoneCnt] = aggregate;

  return (
    <div className='TodoList text-start container'>
      <h3>TodoList</h3>

      <Row>
        <Col xs={12} sm={10} md={10}>
          <div className='alert alert-success my-4'>
            <h4>To Do 총 개수: {totalCnt}</h4>
            <h5>완료된 일: {doneCnt}개</h5>
            <h5>해야할 일: {notDoneCnt}개</h5>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={8} md={8}>
          <input type="text" 
          name='search' 
          className='inputSearch' 
          placeholder='검색어를 입력하세요'
          onChange={onFind}
           />
        </Col>
        <Col xs={12} sm={4} md={4}>
          <Button onChange={onFind}>검색</Button>
        </Col>
      </Row>
      <Row className='mt-3 py-3' style={{width: '100%', display: 'block'}}>
        <Col xs={12} sm={10} md={10}>
          {/* todos의 map()함수 이용해서 TodoListItem출력되도록 key는 todo객체의 id값 설정 */}
          {
            // todos를 getSearchResult()함수가 반환하는 배열로 변경
            getSearchResult().map(todo => (
              // <TodoListItem key={todo.id} content={todo.content}... />
              <TodoListItem key={todo.id} {... todo} onChangeDone={onChangeDone} onDelete={onDelete} />
            ))
          }
        </Col>
      </Row>
    </div>
  );
}