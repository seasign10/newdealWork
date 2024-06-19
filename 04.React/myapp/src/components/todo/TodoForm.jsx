import React, { useCallback, useState, useRef } from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
// import './TodoForm.css'


export default function TodoFrom({onCreate}) {
  const [content, setContent] = useState('');
  // const [isComposing, setIsComposing] = useState(false);
  const contentRef = useRef();


  const onChange = useCallback((e)=>{
    setContent(e.target.value);
  }, [])

  const onKeyDown=(e)=>{
    console.log();
    if(e.keyCode===13){//엔터를 눌렀을 때
       onSubmit();
    }
 }

  const onSubmit=()=>{
    // alert('+')
    // 유효성 체크
    if(!content){
      alert('할 일을 입력해주세요.');
      contentRef.current.focus();
      return;
    }
    // 부모로부터 props로 전달받은 속성(핸들러 함수)를 이용해서 content값을 부모에게 전달
    console.log(content);
    onCreate(content); // 부모로 부터 내려받은 onCreate함수 이용해서 전달
    setContent('');
  }
  const onReset=()=>{
    // alert('reset')
    setContent('');
    contentRef.current.focus(); //여기서 current는 input태그를 가리킴 

  }

  return (
    <div className='my-5 text-start container'>
    <div className='todo_add'><h3>새로운 할 일 추가 </h3><BsFillPencilFill className='mx-2' /></div>
      <Row>
        <Col xs={12} sm={8} md={8}>
            <input className='inputCss' 
            ref={contentRef}
            value={content}
            onChange={onChange}

            onKeyDown={onKeyDown}

            // onKeyDown={(e) => {
            //   if (e.key === 'Enter' && !isComposing) {
            //     onSubmit();
            //   }
            // }}

            // onCompositionStart: 사용자가 IME를 통해 텍스트 입력을 시작할 때 발생합니다.
            // onCompositionUpdate: 사용자가 IME를 통해 텍스트 입력 중일 때 발생합니다.
            // onCompositionEnd: 사용자가 IME를 통해 텍스트 입력을 마쳤을 때 발생합니다.
            // onCompositionStart={() => setIsComposing(true)}
            // onCompositionEnd={() => setIsComposing(false)}

            name='content' 
            type="text" 
            placeholder='할 일을 입력해주세요.'/>
        </Col>


        <Col style={{whiteSpace: 'nowrap'}} xs={12} sm={4} md={4}>
          <Button 
          onClick={onSubmit}
          variant='outline-danger' 
          className='mx-2'><AiOutlinePlus /></Button>
          <Button 
          onClick={onReset}
          variant='outline-success'><AiOutlineReload /></Button>
        </Col>
      </Row>
    </div>
  )
}