import React,{useState,useRef} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

export default function BoardForm() {
  return (
    <>
    <Row className='my-3'>
      <Col className='p-3 mx-auto' md={8}>
        <h1 className='text-center'>Board Write</h1>
      </Col>
    </Row>
    <Row className='my-3'>
      <Col className='p-3 mx-auto' md={8}>
        <Form>
          <Form.Group>
            <Form.Label>제 목</Form.Label>
            <Form.Control type='text' name='title' placeholder='제목을 입력하세요'></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>작성자</Form.Label>
            <Form.Control type='text' name='userid' placeholder='작성자를 입력하세요'></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>내 용</Form.Label>
            <Form.Control as='textarea' rows={7} name='content' placeholder='내용 입력하세요'></Form.Control>
          </Form.Group>
          <div className="my-2 text-center">
            <Button variant='success' className='m-2'>글 쓰 기</Button>
            <Button variant='warning'>다시쓰기</Button>
          </div>
        </Form>
      </Col>
    </Row>
    </>
  )
}
