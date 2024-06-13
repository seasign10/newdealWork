import React, { useState, useRef } from 'react';
import { Form, Container, Button, ListGroup } from 'react-bootstrap';

export default function UseRefHook() {
  const [name, setName] = useState('');
  const [score, setScore] = useState(''); // 0점도 존재할 수 있으므로 초기값을 빈문자열로 설정
  const [list, setList] = useState([]); // 학생 목록

  const nameRef = useRef(null); // input을 참조할 예정 DOM을 참조할때 주로 사용하는 hook
  const scoreRef = useRef(null);

  // 평균점수 계산
  const getAverage = () => {
    if(list.length === 0) return 0; // 학생이 없으면 0점 리턴
    let sum = 0;
    list.forEach((student) => {
      sum += Number(student.score); // 문자열을 숫자로 변환
    });
    let avg = sum / list.length;
    return avg.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // submit 이벤트의 기본 동작을 막는다.
    if (!name) {
      alert('학생명을 입력하세요.');
      //document.getElementById('name').focus();
      nameRef.current.focus(); // 입력 포커스 주기
      return;
    }
    if (!score) {
      alert('점수를 입력하세요.');
      scoreRef.current.focus(); // 입력 포커스 주기
      return;
    }
    if (isNaN(score)) {
      alert('점수는 숫자만 입력하세요.');
      scoreRef.current.select(); // 입력값을 선택
      return;
    }
    console.log('로직 수행 예정 **************');
    // list배열에 새로 등록한 학생객체 추가
    // 입력 필드 값 비워주기
    const student = {name, score};
    setList([...list, student]);
    console.log(list);
    setName('');// 입력 필드 초기화
    setScore('');// 입력 필드 초기화
    nameRef.current.focus(); // 입력 포커스 주기
  };

  return (
    <Container>
      <h1>useRef() 훅 사용</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>학생명: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
            value={name} // input값과 state값을 동기화
            placeholder="학생명을 입력하세요."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>수학 점수: </Form.Label>
          <Form.Control
            type="text"
            name="score"
            ref={scoreRef}
            onChange={(e) => setScore(e.target.value)}
            value={score} // input값과 state값을 동기화
            placeholder="점수를 입력하세요."
          />
        </Form.Group>
        <Form.Group>
          <br />
          <Button variant="success" onClick={handleSubmit}>
            등록
          </Button>
          <hr />
        </Form.Group>
        <ListGroup>
          {list.map((student, index) => (
              <ListGroup.Item>
                <div key={index}>
                  <span>{student.name}</span> : <span>{student.score}점</span>
                </div>
              </ListGroup.Item>
            )
          )}
        </ListGroup>
        <br />
        <h1 className="text-danger">평균점수: {getAverage()}점</h1>
      </Form>
    </Container>
  );
}
