import React,{useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

export default function ReplyEditForm(props) {
  const {showEditModal, editReply, setShowEditModal, updateReply, onEditInputChange} = props; // props로 비구조화 할당

  return (
    <div>
      <Modal show={showEditModal} onHide={()=>{setShowEditModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateReply}>
            <Form.Group className='mb-3'>
              <Form.Label>작성자</Form.Label>
              <Form.Control type='text'
              readOnly
              // editReply가 있으면 userid을 보여주고 없으면 ''을 보여줌 
              value={editReply?.userid}
              name='userid' required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>댓 글</Form.Label>
              <Form.Control as="textarea"
              onChange={onEditInputChange} 
              value={editReply?.content}
              name='content' 
              rows="3" 
              required></Form.Control>
            </Form.Group>
            <div style={{textAlign: 'end'}}>
            <Button type='submit'>댓글 수정</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
