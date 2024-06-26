import React,{useEffect, useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from '../../lib/axiosCreate';

export default function ReplyForm({addReply, logId}) {
  const [reply, setReply] = useState({userid: '', content: ''});
  // 댓글 쓰기 : POST /api/boards/:id/reply
  // 댓글 목록 : GET /api/boards/:id/reply | id번의 게시글에 대한 댓글 목록
  // 댓글수정폼 : GET /api/boards/:id/reply/:rid | id번의 게시글에 대한 rid번 댓글 수정
  // 댓글 수정 : PUT /api/boards/:id/reply/:rid | id번의 게시글에 대한 rid번 댓글 수정
    const onSubmitHandler = async(e) => {
      e.preventDefault();
  
      // props로 부모 컴포넌트의 addReply를 받자
      await addReply(reply);
      setReply({userid: logId, content: ''});
    }
  
  const onChangeHandler = (e) => {
    setReply({...reply, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    setReply((prevReply) => ({ ...prevReply, userid: logId }));
  }, [logId]);
  
  return (
    <div>
      {logId &&
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>작성자</Form.Label>
          <Form.Control type='text' 
          name='userid' 
          // onChange={onChangeHandler}
          readOnly
          value={logId}
          required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>댓 글</Form.Label>
          <Form.Control as="textarea" rows="3" 
          onChange={onChangeHandler}
          value={reply.content}
          name='content' required></Form.Control>
        </Form.Group>
        <Button type='submit'>댓글 추가</Button>
      </Form>
      }
      {!logId&&
        <div className='text-center'>로그인 후 이용 가능합니다.</div>
      }
    </div>
  )
}
