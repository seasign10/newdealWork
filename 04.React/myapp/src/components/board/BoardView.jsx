import React,{useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {Button, Col, Row, Card, Container, Badge} from 'react-bootstrap';
import {AiFillHeart, AiFillDislike} from 'react-icons/ai';
import axios from '../../lib/axiosCreate'
import { log } from 'three/examples/jsm/nodes/Nodes.js';

export default function BoardView() {
  const {id} = useParams(); // url 파라미터 값 가져오기 (게시글 번호)
  const [board, setBoard] = useState({});// 게시글 상세정보
  const navigate = useNavigate();

  useEffect(() => {
    // async가 useEffect에서는 사용하지 못하므로
    // 함수 내부에서 async를 사용하고 호출하는 방식으로 사용
    const fetchData=async()=>{
      // 비동기적으로 수행 .. 게시글 가져오기 > 댓글 가져오기
      //조회수
      await updateReadnum();
      // 게시글
      await getBoard();
      // 댓글
    };
    fetchData();
  },[id]);

  const onDelete = async()=>{
    let yn = window.confirm(`정말로 ${id} 삭제하시겠습니까?`);
    if(yn){
      await axios.delete(`/api/boards/${id}`)
      navigate('/post')
    }
  };

  const updateReadnum = async () => {
    await axios.put(`/api/boardReadnum/${id}`)
    .then(res=>{
      if(res.data.result==='success'){}
    })
    .catch(err=>log('Error :', err.message))
  };

  const getBoard = async () => {
    await axios.get(`/api/boards/${id}`)
    .then(res=>{
      // console.log(JSON.stringify(res.data));
      setBoard(res.data[0]);
    })
    .catch(err=>alert('Error :', err.message))
  };

  return (
    <Container className='py-3'>
      <h2>BoardView [ No. {id}]</h2>
      {board&&
      <>
      <div className="text-end my-2 mt-5 mb-2">
        <Link to={`/postEdit/${id}`} className='mx-2'><Button variant="success">수정</Button></Link>
        <Button 
        onClick={onDelete}
        variant='danger'>삭제</Button>
      </div>
        <Card>
        <Card.Body>
          <h4>{board.title}</h4>
          <hr />
          <div className="cArea">
            {board.content}
            <br />
            <AiFillHeart style={{color:'red'}} />
            <AiFillDislike style={{color:'green'}} />
            &nbsp;&nbsp;
            <Badge bg="primary">{board.readnum}</Badge>
          </div>
          </Card.Body>
        <Card.Footer>
          Create on {board.wdate} by {board.userid}
        </Card.Footer>
      </Card>
      </>
      }
      {
        !board&& <h4 className='text-center my-5'>존재하지 않는 게시글입니다.</h4>
      }
    </Container>
  )
}
