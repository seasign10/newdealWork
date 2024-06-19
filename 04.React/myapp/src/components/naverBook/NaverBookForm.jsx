import React,{useState,useRef} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function NaverBookForm({onFind}) {
  const [search, setSearch] = useState(''); // 검색어
  const searchRef = useRef();
  
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onKeyUp = (e) => { // 키다운은 눌렀을때, 키업은 뗐을때
    if(e.keyCode === 13){
      onSubmit();
    }
  }
  const onSubmit = () => {
    // alert(search);
    if(!search.trim()){ // trim()은 앞뒤 공백을 제거 : 공백도 문자로 인식하기 때문에 공백 제거
      alert('검색어를 입력하세요');
      searchRef.current.focus();
      return;
    }
    onFind(search);
    // 검색어를 부모에게 전달
  };

  return (
    <Row>
      <Col md={8} className="offset-1">
        <Form.Control type="search"
        ref={searchRef}
        onChange={onChangeHandler}
        value={search}
        onKeyUp={onKeyUp}
        placeholder='검색어를 입력하세요' />
      </Col>
      <Col md={3}>
        <Button onClick={onSubmit}>검색</Button>
      </Col>
    </Row>
  );
}